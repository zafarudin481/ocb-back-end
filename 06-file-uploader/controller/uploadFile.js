import { pool } from "../database/connection.js";

const query = `
INSERT INTO files (fieldname, originalname, encoding, mimetype, destination, filename, path, size)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;
`;

async function UploadFile(req, res) {
    try {
        // req.file comes from multer middleware
        const file = req.file;

        // insert file details into files table
        const dbRes = await pool.query(query, [file.fieldname, file.originalname, file.encoding, file.mimetype, file.destination, file.filename, file.path, file.size]);

        const data = dbRes.rows[0];
        res.status(200).json({
            message: "File uploads successfull",
            file: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default UploadFile;