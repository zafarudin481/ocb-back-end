import { pool } from "../../database/connection.js";

const queryReadAllToDos = `SELECT * FROM to_dos`;
const queryCheckUser = `SELECT * FROM users WHERE id = $1`;
const queryReadToDosByUser = `SELECT * FROM to_dos WHERE user_id = $1`;

export async function readAllToDos(req, res) {
    try {
        const dbRes = await pool.query(queryReadAllToDos);
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

export async function readToDosByUser(req, res) {
    try {
        const userId = req.body.user_id;

        // check if user is exists or not
        const dbResCheckUser = await pool.query(queryCheckUser, [userId]);
        const dataUser = dbResCheckUser.rows;
        if (dataUser.length === 0) {
            return res.status(409).json({
                message: "User does not exists"
            });
        };

        const dbRes = await pool.query(queryReadToDosByUser, [userId]);
        const data = dbRes.rows;
        if (data.length === 0) {
            return res.status(400).json({
                message: "User do not have any to do item yet"
            });
        };

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