import express from "express";
import HealthController from "./controller/health.js";
import NotFound from "./controller/not-found.js";
import { databaseInit } from "./database/connection.js";
import createUser from "./controller/user.controller/create.js";
import { readAllUsers, readUserById } from "./controller/user.controller/read.js";
import updateUser from "./controller/user.controller/update.js";
import deleteUser from "./controller/user.controller/delete.js";
import createToDo from "./controller/todo.controller/create.js";
import readAllToDos from "./controller/todo.controller/read.js";
import updateToDo from "./controller/todo.controller/update.js";
import deleteToDo from "./controller/todo.controller/delete.js";
import createToken from "./controller/auth.js";
import isAuth from "./middleware/isauth.js";

const app = express();
const PORT = 8080;

// middleware
// parse application/json and application/x-www-form-urlencoded to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection and execute DDL queries to create tables
databaseInit();

// GET and POST health routes
// all DML operations will be done in controller
app.get("/", HealthController.get);
app.post("/", HealthController.post);
app.get("/users", readAllUsers);
app.get("/users/:id", readUserById);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

// authentication
app.post("/register", createUser);
app.post("/login", createToken);

// routes to handle todos and authenticated routes
app.post("/todos", isAuth, createToDo);
app.get("/todos", isAuth, readAllToDos);
app.put("/todos/:id", isAuth, updateToDo);
app.delete("/todos/:id", isAuth, deleteToDo);

// not found controller
app.use(NotFound);

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});