import { pool } from "../database/connection.js";

// users (id, email, password, created_at, updated_at)

const query = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
`;

export async function createUsersTable() {
    try {
        await pool.query(query);
        console.log("Users table is created");
    } catch (error) {
        console.error(error);
    }
};

export default createUsersTable;