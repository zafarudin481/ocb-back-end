import express from "express";
import Home from "./controller/home.js";
import Dashboard from "./controller/dashboard.js";
import GenerateShortURL from "./controller/generateShortURL.js";
import Redirect from "./controller/redirectShortUrl.js";

const app = express();
const PORT = 3000;

// handle static public files
app.use(express.static("public"));

// handle body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle routing
app.get("/", Home);
app.post("/shorten", GenerateShortURL);
app.get("/dashboard", Dashboard);
// initialize a param route by using a colon before the rout parameter
app.get("/:shortUrl", Redirect);
// there is no routing to "404 - file not found" here, because the routing is handle under the redirectShortUrl.js controller

// initialize nodejs server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})