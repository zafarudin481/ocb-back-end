import { pool } from "../../database/connection.js";

const queryReadAllToDos = `SELECT * FROM to_dos WHERE user_id = $1`;

async function readAllToDos(req, res) {
    try {
        const userId = req.userId;
        const dbRes = await pool.query(queryReadAllToDos, [userId]);
        const data = dbRes.rows;
        res.status(200).json({
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default readAllToDos;