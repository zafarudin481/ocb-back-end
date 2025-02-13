import express from "express";
import { GetHealth, PostHealth } from "./controller/health.js";
import { databaseInit } from "./database/connection.js";
import { UploadFile } from "./controller/uploadFile.js";
import upload from "./middleware/upload.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize database connection
databaseInit();

// server health controller
app.get("/", GetHealth);
app.post("/", PostHealth);

// server upload routes
app.post("/upload", upload.single('image'), UploadFile);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});