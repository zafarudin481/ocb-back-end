import express from "express";
import HealthController from "./controller/health.js";
import NotFound from "./controller/not-found.js"

const app = express();
const PORT = 8080;

// middleware
// parse application/json and application/x-www-form-urlencoded to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET and POST health routes
app.get('/', HealthController.get);
app.post('/', HealthController.post);

// not found controller
app.use(NotFound);

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});