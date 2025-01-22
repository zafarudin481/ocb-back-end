// importing require nodejs core module
const http = require('http');
const fs = require('fs');
const path = require('path');

// assigning port no for nodejs server
const portNo = 8080;

// read the external file first before passing it to the http response
const indexHtmlPath = path.join(__dirname, "pages", "index.html");
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
const projectsHtmlPath = path.join(__dirname, "pages", "projects.html");
const projectsHtml = fs.readFileSync(projectsHtmlPath, 'utf-8');
const NotFoundHtmlPath = path.join(__dirname, "pages", "404.html");
const NotFoundHtml = fs.readFileSync(NotFoundHtmlPath, 'utf-8');

// read the dependence file
const cssPath = path.join(__dirname, "public", "style.css");
const css = fs.readFileSync(cssPath, 'utf-8');
const jsPath = path.join(__dirname, "public", "script.js");
const js = fs.readFileSync(jsPath, 'utf-8');

// to monitor visitor count
let visitorCount = 0;

// creating server
const server = http.createServer((req, res) => {
    // url to handle server routing
    const url = req.url.toLowerCase();
    console.log(url);

    // handling public files or static files like css, js, images
    // serve style.css
    if (url === "/style.css") {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(css);
        res.end();
        return;
    }

    // serve script.js
    if (url === "/script.js") {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.write(js);
        res.end();
        return;
    }

    // following line handle html pages
    if (url === "/") {
        visitorCount++;
        console.log("Visitor count: ", visitorCount);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(indexHtml);
        res.end();
        return;
    }

    if (url === "/projects") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(projectsHtml);
        res.end();
        return;
    }

    // following line handle unavailable resources/url
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(NotFoundHtml);
    res.end();
})


/*
// using fs.readFile() to for reading file will take extra lines since there is callback function need to be included, instead use fs.readFileSync() and put it outside of http.createServer()

const server = http.createServer((req, res) => {
    // extracting the url from the client request
    const url = req.url.toLowerCase();
    console.log(url);

    // using if statement by using extracted url as argument to have different server respond
    if (url === "/") {
        const homePath = path.join(__dirname, "pages", "index.html");
        fs.readFile(homePath, "utf-8", (err, data) => {
            if (err) {
                console.log("File failed to be read");
            } else {
                console.log("File successfully read");
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                res.end();
            }
        });
        return;
    };

    if (url === "/projects") {
        const projectsPath = path.join(__dirname, "pages", "projects.html");
        fs.readFile(projectsPath, "utf-8", (err, data) => {
            if (err) {
                console.log("File failed to be read");
            } else {
                console.log("File successfully read");
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                res.end();
            }
        });
        return;
    };

    // if none of the above if statements is true, following line would run as default
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write('<h1>404 Not Found</h1>');
    res.end();
});
*/

// to start  the server by accepting new connections
server.listen(portNo, () => {
    console.log(`Server is running on port ${portNo}`);
});
