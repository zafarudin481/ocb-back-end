import { Router } from "express";

const privateRouter = Router();

privateRouter.get("/helloworld", (req, res) => {
    res.send("<h1>Hello Admin!</h1>");
});

privateRouter.get("/helloworld-json", (req, res) => {
    res.json({ message: "Hello Admin!" });
});

export default privateRouter;