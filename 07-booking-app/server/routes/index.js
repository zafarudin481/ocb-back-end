import { Router } from "express";
import register from "../controllers/auth/register.js";
import login from "../controllers/auth/login.js";
import bookASlotForPublic from "../controllers/slot/slot.public.booking.js";
import listAllAvailableSlots from "../controllers/slot/slot.public.list.js";

const publicRouter = Router();

publicRouter.get("/helloworld", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

publicRouter.get("/helloworld-json", (req, res) => {
    res.json({ message: "Hello World!" });
});

publicRouter.post("/register", register);
publicRouter.post("/login", login);

publicRouter.get("/slots", listAllAvailableSlots);
publicRouter.put("/slots/:id/book", bookASlotForPublic);

export default publicRouter;