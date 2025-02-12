import { pool } from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const queryCheckEmail = `SELECT * FROM users WHERE email = $1;`;

async function createToken(req, res) {
    try {
        // client request body
        const email = req.body.email;
        const password = req.body.password;

        // check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Bad request"
            });
        };

        // check if email exists or not
        const dbRes = await pool.query(queryCheckEmail, [email]);
        const user = dbRes.rows[0];

        // if user not found, return 404
        if (!user) {
            return res.status(404).json({
                message: "User not found"
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
        const secretKey = 'supadupa';
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

export default createToken;