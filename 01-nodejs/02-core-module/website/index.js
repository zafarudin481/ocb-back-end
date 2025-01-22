const http = require('http');
const fs = require('fs');
const path = require('path');

const portNo = 8080;

const server = http.createServer((req, res) => {
    const url = req.url.toLowerCase();
    console.log(url);

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

    res.writeHead(404, { "Content-Type": "text/html" });
    res.write('<h1>404 Not Found</h1>');
    res.end();
});

server.listen(portNo, () => {
    console.log(`Server is running on port ${portNo}`);
});

