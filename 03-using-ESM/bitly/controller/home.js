import fs from "fs";
import path from "path";

function Home(req, res) {
    // const homeHtmlPath = path.join(__dirname, "pages", "index.html");
    // the __dirname can't be used since it is only availabe in Common JS, thus for ECMAScript Module (ESM) we use process.cwd() to get current working directory
    const homePath = path.join(process.cwd(), "pages", "index.html")
    const home = fs.readFileSync(homePath, 'utf-8');

    res.send(home);
}

// exporting module using ESM
export default Home;