import { pool } from "../../database/connection.js"

// SQL query
const queryUpdateUserById = `UPDATE users SET username = $1, email = $2 WHERE id = $3`;
const queryCheckEmail = `SELECT * FROM users WHERE email = $1 AND id != $2;`;
const queryCheckUsername = `SELECT * FROM users WHERE username = $1 AND id != $2;`;
const queryCheckUser = `SELECT SUM(CASE WHEN email = $1 THEN 1 ELSE 0 END) email_exist, SUM(CASE WHEN username = $2 THEN 1 ELSE 0 END) username_exist
FROM users WHERE id != $3;`;


async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const username = req.body.username;
        const email = req.body.email;

        //validate the request body
        if (!username || !email) {
            return res.status(400).json({
                message: "Username and email are required"
            });
        };

        // validate email by using regex
        const emailRegex = /\S+@\S+\.\S+/;
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        };

        // alternative query to check email and username is already exist or not
        const dbResCheckUser = await pool.query(queryCheckUser, [email, username, id]);
        const data = dbResCheckUser.rows[0];
        if (data.email_exist != 0 && data.username_exist != 0) {
            return res.status(409).json({
                message: "Email address and username already being used. Please change to different email and username"
            });
        } else if (data.email_exist != 0 && data.username_exist == 0) {
            return res.status(409).json({
                message: "An account with this email address already exists. Please use different email address"
            });
        } else if (data.email_exist == 0 && data.username_exist != 0) {
            return res.status(409).json({
                message: "Username is already being used. Please use different username"
            });
        };

        // check if new email and username is already exist
        // const dbResCheckEmail = await pool.query(queryCheckEmail, [email, id]);
        // const dbResCheckUsername = await pool.query(queryCheckUsername, [username, id]);
        // const data = [dbResCheckEmail.rows, dbResCheckUsername.rows];
        // if (data[0].length != 0 && data[1].length != 0) {
        //     return res.status(409).json({
        //         message: "Email address and username already being used. Please change your new email address and username"
        //     });
        // } else if (data[0].length != 0 && data[1].length == 0) {
        //     return res.status(409).json({
        //         message: "An account with this email address already exists. Please use different email"
        //     });
        // } else if (data[0].length == 0 && data[1].length != 0) {
        //     return res.status(409).json({
        //         message: "Username is already being used. Please use different username."
        //     });
        // };

        await pool.query(queryUpdateUserById, [username, email, id]);
        res.status(200).json({
            message: "User successfully updated"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default updateUser;