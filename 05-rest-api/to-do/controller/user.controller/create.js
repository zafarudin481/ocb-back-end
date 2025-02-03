import { pool } from "../../database/connection.js";

// $ is placeholder for dynamic value
const query = `
INSERT INTO users (username, password, email, is_admin)
VALUES ($1, $2, $3, $4);
`;

async function createUser(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const isAdmin = req.body.isAdmin;

        // validation for request body
        if (!username || !password || !email) {
            return res.status(400).json({
                message: "Username, Password and Email is required"
            });
        };

        // check email string using regex
        const emailRegex = /\S+@\S+\.\S+/;
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        };

        // check if the user already exist
        // to be explore 

        const dbRes = await pool.query(query, [username, password, email, isAdmin]);
        console.log(dbRes);
        res.status(201).json({
            message: "User is created"
        });
    } catch (error) {
        // rewrite error message because it is not a good practice to expose database error message directly to the client
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export default createUser;