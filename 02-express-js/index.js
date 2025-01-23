const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 8080;

// initialize static folder contain file like css, js, images
app.use(express.static("public"));


// handle server routing
app.get("/", function (req, res) {
    const homeHtmlPath = path.join(__dirname, "pages", "index.html");
    const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');

    res.setHeader("Content-Type", "text/html");
    res.send(homeHtml);
    // by default, express will automatically send response code accordingly, however if we need to set the response code by our selves, used following line
    // res.status(200).send(homeHtml);
})

app.get("/bmi-form", function (req, res) {
    const bmiFormPath = path.join(__dirname, "pages", "bmi-form.html");
    const bmiForm = fs.readFileSync(bmiFormPath, 'utf-8');

    res.setHeader("Content-Type", "text/html");
    res.send(bmiForm);
})

app.get("/bmi-result", function (req, res) {
    const bmiResultPath = path.join(__dirname, "pages", "bmi-result.html");
    const bmiResult = fs.readFileSync(bmiResultPath, 'utf-8');

    res.setHeader("Content-Type", "text/html");
    res.send(bmiResult);
})

// start server
app.listen(PORT, function () {
    console.log(`Server is running on PORT: ${PORT}`)
})