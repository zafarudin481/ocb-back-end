export function GetHealth(req, res) {
    res.status(200).json({
        message: "Hello World!"
    });
};

export function PostHealth(req, res) {
    const body = req.body;
    res.status(200).json({
        body
    });
};