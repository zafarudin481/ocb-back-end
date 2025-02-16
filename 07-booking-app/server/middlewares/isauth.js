import jwt from "jsonwebtoken";

function isAuth(req, res, next) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    };

    // check if token is provided
    const token = bearerToken.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    };

    // check if token is valid
    const secretKey = process.env.JWT_SECRET_KEY;
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