import express from "express";
import publicRouter from "./routes/index.js";
import privateRouter from "./routes/admin.js";
import { databaseInit } from "./database/connection.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// database connection and execute DDL queries to create tables
databaseInit();

app.use("/", publicRouter);
app.use("/admin", privateRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost/${PORT}`);
});