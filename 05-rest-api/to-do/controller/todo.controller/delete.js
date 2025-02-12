import { pool } from "../../database/connection.js";

const queryCheckToDo = `SELECT * FROM to_dos WHERE id = $1;`;
const queryDeleteToDoById = `DELETE FROM to_dos WHERE id = $1;`;

async function deleteToDo(req, res) {
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

        // delete todo item in database
        await pool.query(queryDeleteToDoById, [todoId]);
        res.status(200).json({
            message: "Todo item successfully deleted"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default deleteToDo;