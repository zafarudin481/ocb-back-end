import { pool } from "../../database/connection.js";

const queryCreateToDo = `INSERT INTO to_dos (item, user_id) VALUES ($1, $2);`;
// const queryCheckUser = `SELECT * FROM users WHERE id = $1;`;

async function createToDo(req, res) {
    try {
        // payload request body from client
        const item = req.body.item;
        const userId = req.userId;

        // check request body
        if (!item || !userId) {
            return res.status(400).json({
                message: "Invalid request"
            });
        };

        // add item to database
        const dbRes = await pool.query(queryCreateToDo, [item, userId]);
        res.status(200).json({
            message: "Item successfully added"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default createToDo;