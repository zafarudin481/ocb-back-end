import { Router } from "express";
import isAuth from "../middlewares/isauth.js";
import createNewSlot from "../controllers/slot/slot.create.js";
import listAllSlots from "../controllers/slot/slot.list.js";
import deleteSlot from "../controllers/slot/slot.delete.js";
import listAllBookedSlots from "../controllers/slot/slot.bookedList.js";
import viewBookedSlotDetails from "../controllers/slot/slot.view.js";
import updateBookedSlot from "../controllers/slot/slot.update.js";

const privateRouter = Router();

privateRouter.use(isAuth);

privateRouter.get("/helloworld", (req, res) => {
    res.send("<h1>Hello Admin!</h1>");
});

privateRouter.get("/helloworld-json", (req, res) => {
    res.json({ message: "Hello Admin!" });
});

privateRouter.post("/slots", createNewSlot);
privateRouter.get("/slots", listAllSlots);
privateRouter.delete("/slots/:id", deleteSlot);

privateRouter.get("/bookings", listAllBookedSlots);
privateRouter.get("/bookings/:id", viewBookedSlotDetails);
privateRouter.put("/bookings/:id", updateBookedSlot);

export default privateRouter;