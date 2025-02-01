function get(req, res) {
    const resObj = {
        message: "Server to-do-app REST API is running",
        data: true
    };
    res.status(200).json(resObj);
};

function post(req, res) {
    const body = req.body;
    const resObj = {
        message: "Server to-do-app REST API is running",
        data: body,
    };
    res.status(200).json(resObj);
};

const HealthController = {
    get,
    post
};

export default HealthController;