import { pool } from "../../database/connection.js";
import bcrypt from "bcrypt";

// SQL query
// $ is placeholder for dynamic value
const queryCreateUser = `
INSERT INTO users (username, password, email, is_admin)
VALUES ($1, $2, $3, $4);
`;
const queryCheckEmail = `
SELECT * FROM users WHERE email = $1;
`;
const queryCheckUsername = `
SELECT * FROM users WHERE username = $1;
`;

async function createUser(req, res) {
    try {
        // bcrypt
        const SALTROUNDS = 10;

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

        // check if the email and username already exist
        const dbResCheckEmail = await pool.query(queryCheckEmail, [email]);
        const dbResCheckUsername = await pool.query(queryCheckUsername, [username]);
        const data = [dbResCheckEmail.rows, dbResCheckUsername.rows];
        if (data[0].length != 0 && data[1].length != 0) {
            return res.status(409).json({
                message: "Email address and username already being used. Please log in or change your email address and username"
            });
        } else if (data[0].length != 0 && data[1].length == 0) {
            return res.status(409).json({
                message: "An account with this email address already exists. Please log in or use a different email to register."
            });
        } else if (data[0].length == 0 && data[1].length != 0) {
            return res.status(409).json({
                message: "Username is already being used. Please use different username."
            });
        };

        // hash password
        const salt = bcrypt.genSaltSync(SALTROUNDS);
        const hashPassword = bcrypt.hashSync(password, salt);

        // create user in database using query
        const dbRes = await pool.query(queryCreateUser, [username, hashPassword, email, isAdmin]);
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