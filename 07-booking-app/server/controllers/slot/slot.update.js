import { pool } from "../../database/connection.js";

const queryCheckSlotDetails = `
SELECT id, date, time, customer_name, customer_email, customer_phone
FROM slots
WHERE id = $1 AND customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL;
`;
const queryUpdateSlot = `
UPDATE slots
SET date = $1, time = $2, customer_name = $3, customer_email = $4, customer_phone = $5
WHERE id = $6
RETURNING id, date, time, customer_name, customer_email, customer_phone;
`;

const updateBookedSlot = async (req, res) => {
    try {
        const slotId = req.params.id;
        const reschedule = req.body.reschedule;
        let date;
        let time;
        let customerName;
        let customerEmail;
        let customerPhone;

        // check if reschedule is null
        if (reschedule == null) {
            return res.status(400).json({
                message: "Reschedule parameter is required"
            });
        };

        // check slot details
        const dbResSlot = await pool.query(queryCheckSlotDetails, [slotId]);
        const slot = dbResSlot.rows;
        if (!slot.length) {
            return res.status(400).json({
                message: "Slot not found or still available"
            });
        };

        // update data according to reschedule boolean
        if (reschedule == true) {
            date = req.body.date;
            time = req.body.time;
            customerName = slot[0].customer_name;
            customerEmail = slot[0].customer_email;
            customerPhone = slot[0].customer_phone;
            if (!date || !time) {
                return res.status(400).json({
                    message: "Date and time is required for rescheduling"
                });
            };
        } else {
            date = slot[0].date;
            time = slot[0].time;
            customerName = null;
            customerEmail = null;
            customerPhone = null;
        };

        const dbRes = await pool.query(queryUpdateSlot, [date, time, customerName, customerEmail, customerPhone, slotId]);
        const updatedSlot = dbRes.rows[0];

        res.status(200).json({
            message: "Slot updates successful",
            slot: updatedSlot
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default updateBookedSlot;