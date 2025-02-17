import { pool } from "../../database/connection.js";

const queryCheckBookedSlot = `
SELECT id, date, time, customer_name, customer_email, customer_phone
FROM slots
WHERE id = $1 AND customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL
`;

const viewBookedSlotDetails = async (req, res) => {
    try {
        const slotId = req.params.id;

        // check for booked slot
        const dbResSlot = await pool.query(queryCheckBookedSlot, [slotId]);
        const slot = dbResSlot.rows;
        if (!slot.length) {
            return res.status(400).json({
                message: "Slot not found or already been booked"
            });
        };

        // return data to client
        res.json({
            slot
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default viewBookedSlotDetails;