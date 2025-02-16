import { pool } from "../../database/connection.js";

const queryCheckSlot = `
SELECT * FROM slots
WHERE id = $1 AND customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL;
`;

const queryUpdateSlot = `
UPDATE slots
SET customer_name = $1, customer_email = $2, customer_phone = $3
WHERE id = $4
RETURNING id, date, time, customer_name, customer_email, customer_phone;
`;

const bookASlotForPublic = async (req, res) => {
    try {
        const slotId = req.params.id;
        const customerName = req.body.customer_name;
        const customerEmail = req.body.customer_email;
        const customerPhone = req.body.customer_phone

        const dbResSlot = await pool.query(queryCheckSlot, [slotId]);
        if (dbResSlot.rows.length) {
            return res.status(400).json({
                message: "Slot already booked"
            });
        };

        const dbRes = await pool.query(queryUpdateSlot, [customerName, customerEmail, customerPhone, slotId]);
        const slots = dbRes.rows;

        res.status(200).json({
            data: slots
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default bookASlotForPublic;