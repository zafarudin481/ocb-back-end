import { pool } from "../database/connection.js";

async function ListAllFiles(req, res) {
    try {
        const query = `SELECT * FROM files;`;
        const dbRes = await pool.query(query);

        // parse the path to include the full URL
        const data = dbRes.rows.map((file) => {
            return {
                ...file,
                path: `http://localhost:8080/uploads/${file.filename}`
            };
        });

        res.status(200).json({
            message: `${data.length} files found`,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default ListAllFiles;