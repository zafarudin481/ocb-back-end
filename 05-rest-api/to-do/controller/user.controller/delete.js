import { pool } from "../../database/connection.js";

const queryDeleteUserById = `DELETE FROM users WHERE id = $1`;
const queryCheckUser = `SELECT * FROM users WHERE id = $1`;

async function deleteUser(req, res) {
    try {
        const id = req.params.id;

        // check if user exist
        const dbResCheckUser = await pool.query(queryCheckUser, [id]);
        const data = dbResCheckUser.rows;
        if (data.length === 0) {
            return res.status(409).json({
                message: "User does not exist"
            });
        };

        // delete user in database
        await pool.query(queryDeleteUserById, [id]);
        res.status(200).json({
            message: "User successfully deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default deleteUser;