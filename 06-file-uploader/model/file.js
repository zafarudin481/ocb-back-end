import { pool } from "../database/connection.js";

// create files table if not exist with column name as follows:
// id, fieldname, originalname, encoding, mimetype, destination, filename, path, size

const query = `
CREATE TABLE IF NOT EXISTS files (
    id SERIAL PRIMARY KEY,
    fieldname VARCHAR(255),
    originalname VARCHAR(255),
    encoding VARCHAR(255),
    mimetype VARCHAR(255),
    destination VARCHAR(255),
    filename VARCHAR(255),
    path TEXT,
    size INT
);
`;

// create file table
async function createFilesTable() {
    try {
        await pool.query(query);
        console.log("Files table is created");
    } catch (error) {
        console.error(error);
    };
};

export default createFilesTable;