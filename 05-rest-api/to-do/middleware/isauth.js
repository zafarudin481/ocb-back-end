import jwt from "jsonwebtoken";

function isAuth(req, res, next) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];

    // check if token is provided
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    };

    // check if token is valid
    const secretKey = "supadupa";
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        };

        // pass user id to the next middleware or controller
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    });
};

export default isAuth;