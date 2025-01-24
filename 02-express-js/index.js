const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 8080;

// initialize static folder contain file like css, js, images
app.use(express.static("public"));

// initialize body parser
// to parse http body request as a javascript object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
    const bmi = req.query.bmi;
    console.log(bmi);

    const bmiResultPath = path.join(__dirname, "pages", "bmi-result.html");
    let bmiResult = fs.readFileSync(bmiResultPath, 'utf-8');

    // replace the placeholder with actual value
    if (bmi) {
        bmiResult = bmiResult.replace("[(BMI-RESULT)]", bmi);
    } else {
        bmiResult = bmiResult.replace("[(BMI-RESULT)]", "No BMI value");
    }

    res.setHeader("Content-Type", "text/html");
    res.send(bmiResult);
})

// POST request from BMI form
app.post("/calculate", function (req, res) {
    // view the data from the form inputs
    const data = req.body;
    console.log(data);

    const weight = Number(data.weight);
    const height = Number(data.height);

    const bmi = (weight / (height * height)).toFixed(2);
    console.log(bmi);

    // concat the result in the redirect link
    res.redirect("/bmi-result" + "?bmi=" + bmi);
})

// not found page
app.use(function (req, res) {
    const notFoundPath = path.join(__dirname, "pages", "404.html");
    const notFound = fs.readFileSync(notFoundPath, 'utf-8');

    res.setHeader("Content-Type", "text/html");
    res.status(404).send(notFound);
})

// start server
app.listen(PORT, function () {
    console.log(`Server is running on PORT: ${PORT}`)
})