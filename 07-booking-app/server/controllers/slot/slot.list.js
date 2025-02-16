import { pool } from "../../database/connection.js";

const queryListAllSlots = `
SELECT id, date, time FROM slots ORDER BY date, time ASC;
`;

// things to explore: add pagination to this controller

const listAllSlots = async (req, res) => {
    try {
        // pagination details in query params
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset = (page - 1) * limit;


        const dbRes = await pool.query(queryListAllSlots);
        const slots = dbRes.rows;
        const message = slots.length ? `Found ${slots.length} slot(s)` : "No slots found";
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

export default listAllSlots;