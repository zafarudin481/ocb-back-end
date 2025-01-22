// importing require nodejs core module
const http = require('http');
const fs = require('fs');
const path = require('path');

// declaring the port no for nodejs server
const portNo = 8080;

// creating server
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

// to start  the server by accepting new connections
server.listen(portNo, () => {
    console.log(`Server is running on port ${portNo}`);
});
