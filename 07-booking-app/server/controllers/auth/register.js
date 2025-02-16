import { pool } from "../../database/connection.js";
import bcrypt from "bcrypt";
import { validateEmail } from "../../utils/helper.js";

// query to check existing email
const queryCheckEmail = ` SELECT COUNT(*) FROM users WHERE email = $1;`;
// query to create new user
const queryCreateUser = `INSERT INTO users (email, password) VALUES ($1, $2);`;

async function register(req, res) {
    try {
        // bcrypt
        const SALTROUNDS = 10;

        const email = req.body.email;
        const password = req.body.password;

        // validation for request body
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password is required"
            });
        };

        // check email string using regex
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        };

        // alternative query which only one pool query is used to check if email or username already exist or not
        const dbResCheckUser = await pool.query(queryCheckEmail, [email]);
        const data = dbResCheckUser.rows[0];
        if (data.count != 0) {
            return res.status(409).json({
                message: "An account with this email address already exists. Please log in or use a different email to register"
            });
        };

        // hash password
        const salt = bcrypt.genSaltSync(SALTROUNDS);
        const hashPassword = bcrypt.hashSync(password, salt);

        // create user in database using query
        await pool.query(queryCreateUser, [email, hashPassword]);
        res.status(201).json({
            message: "User is created"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default register;