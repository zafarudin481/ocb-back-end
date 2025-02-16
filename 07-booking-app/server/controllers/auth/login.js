import { pool } from "../../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEmail } from "../../utils/helper.js";

// query to check existing user
const queryCheckEmail = `SELECT * FROM users WHERE email = $1;`;

async function login(req, res) {
    try {
        // client request body
        const email = req.body.email;
        const password = req.body.password;

        // check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        };

        // check email string using regex
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        };

        // check if email exists or not
        const dbRes = await pool.query(queryCheckEmail, [email]);
        const user = dbRes.rows[0];

        // if user not found, return 404
        if (!user) {
            return res.status(404).json({
                message: "User not found, please register"
            });
        };

        // check if password is correct using bcrypt
        const invalidPassword = bcrypt.compareSync(password, user.password);

        // return 401 if password incorrect
        if (!invalidPassword) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        };

        // create token
        const data = {
            id: user.id,
            email: user.email
        };
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(data, secretKey);

        res.status(200).json({
            message: "Token is created",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default login;