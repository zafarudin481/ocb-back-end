import { pool } from "../../database/connection.js";

const queryDeleteUserById = `DELETE FROM users WHERE id = $1`;

async function deleteUser(req, res) {
    try {
        // TO ADD:
        // check if user exist

        const id = req.params.id;
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