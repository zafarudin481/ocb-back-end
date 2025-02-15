import express from "express";
import { GetHealth, PostHealth } from "./controller/health.js";
import { databaseInit } from "./database/connection.js";
import UploadFile from "./controller/uploadFile.js";
import upload from "./middleware/upload.js";
import ListAllFiles from "./controller/listAllFiles.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// initialize database connection
databaseInit();

// server health controller
app.get("/", GetHealth);
app.post("/", PostHealth);

// server upload routes
app.get("/upload", ListAllFiles);
app.post("/upload", upload.single('image'), UploadFile);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});