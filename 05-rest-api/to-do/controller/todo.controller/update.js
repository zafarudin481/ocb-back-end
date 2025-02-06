import { pool } from "../../database/connection.js";

const queryCheckToDo = `SELECT * FROM to_dos`;
const queryUpdateToDo = `UPDATE to_dos SET item = $1, status = $2 WHERE id = $3;`;

async function updateToDos(req, res) {
    try {
        const todoId = req.params.id;

        // check whether the todo item exists or not
        const dbResCheckToDo = await pool.query(queryCheckToDo);
        const dataTodo = dbResCheckToDo.rows;
        if (dataTodo.length === 0) {
            return res.status(409).json({
                message: "To do item did not exists"
            });
        };

        // check if request body is available or not
        const item = req.body.item;
        const status = req.body.status;
        if (!item || !status) {
            return res.status(400).json({
                message: "To do item and status are required"
            });
        };

        // update to do in database
        await pool.query(queryUpdateToDo, [item, status, todoId]);
        res.status(200).json({
            message: "Item successfully updated"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default updateToDos;