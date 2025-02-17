import { pool } from "../../database/connection.js";

const queryListAllBookedSlots = `
SELECT id, date, time, customer_name, customer_email, customer_phone FROM slots
WHERE customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL;
`;

const listAllBookedSlots = async (req, res) => {
    try {
        // pagination details in query params
        const dbRes = await pool.query(queryListAllBookedSlots);
        const slots = dbRes.rows;
        const message = slots.length ? `Found ${slots.length} booked slot(s)` : "No booked slots found";
        res.status(200).json({
            message,
            data: slots
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default listAllBookedSlots;