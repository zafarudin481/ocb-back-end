import express from "express";
import { GetHealth, PostHealth } from "./controller/health.js";
import { databaseInit } from "./database/connection.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize database connection
databaseInit();

// server health controller
app.get("/", GetHealth);
app.post("/", PostHealth);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});