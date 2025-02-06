import { pool } from "../database/connection.js";

// create todo table
// id, text, status, created_at, user_id

const query = `
CREATE TABLE IF NOT EXISTS to_dos (
    id SERIAL PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
`;

async function createTodosTable() {
    try {
        await pool.query(query);
        console.log("To-dos table is created");
    } catch (error) {
        console.error(error);
    }
};

export default createTodosTable;