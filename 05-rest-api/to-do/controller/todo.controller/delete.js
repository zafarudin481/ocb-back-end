import { pool } from "../../database/connection.js";

const queryCheckToDo = `SELECT * FROM to_dos WHERE id = $1;`;
const queryDeleteToDoById = `DELETE FROM to_dos WHERE id = $1;`;

async function deleteToDo(req, res) {
    try {
        const todoId = req.params.id;

        // check if the to do item exists or not
        const dbResCheckToDo = await pool.query(queryCheckToDo, [todoId]);
        const data = dbResCheckToDo.rows;
        if (data.length === 0) {
            return res.status(400).json({
                message: "To do item is not exists"
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