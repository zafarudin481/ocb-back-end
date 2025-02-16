import { pool } from "../../database/connection.js";

// available slots is determined by the absence of customer_name, customer_email and customer_phone
const queryListAllAvailableSlots = `
SELECT id, date, time FROM slots
WHERE customer_name IS NULL AND customer_email IS NULL AND customer_phone IS NULL;
`;

const queryListAllBookedSlots = `
SELECT id, date, time FROM slots
WHERE customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL;
`;

const listAllAvailableSlots = async (req, res) => {
    try {
        const availableSlots = await pool.query(queryListAllAvailableSlots);
        const bookedSlots = await pool.query(queryListAllBookedSlots);

        const slots = {
            available: availableSlots.rows,
            booked: bookedSlots.rows
        };
        const message = `Available slots: ${availableSlots.rowCount}, Booked slots: ${bookedSlots.rowCount}`;

        return res.status(200).json({
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

export default listAllAvailableSlots;