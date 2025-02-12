import { pool } from "../../database/connection.js";

const queryCheckToDo = `SELECT * FROM to_dos WHERE id = $1`;
const queryUpdateToDo = `UPDATE to_dos SET item = $1, status = $2 WHERE id = $3;`;

async function updateToDo(req, res) {
    try {
        const todoId = req.params.id;
        const userId = req.userId;

        // check if user is authorized to access todo item
        const dbResCheckTodo = await pool.query(queryCheckToDo, [todoId]);
        const todoItem = dbResCheckTodo.rows;
        if (todoItem.length === 0) {
            return res.status(404).json({
                message: "Item not found"
            });
        };

        const ownerId = todoItem[0].user_id;
        if (userId !== ownerId) {
            return res.status(403).json({
                message: "Forbidden"
            });
        };

        // check if request body is available or not
        const item = req.body.item;
        const status = req.body.status;
        if (!item || status == null) {
            return res.status(400).json({
                message: "Bad request"
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

export default updateToDo;