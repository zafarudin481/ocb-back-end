// importing http module
const http = require('http');

const portNo = 8080;
// Our computer only have one IP address, which is 127.0.0.1 (localhost).
// Since there are various applications in our computer are accessing the IP address, so we need the port number to access our created nodejs server.
// to connect to our own server, we can go to http://localhost:portNo in our browser


// this is basic way to create a server using the module
/*
const server = http.createServer((req, res) => {
    // res is server respond, while req is the incoming message from client

    res.writeHead(200, { "Content-Type": "text/html" }); // this line is the head section of our server respond
    // 200 is the http response code indicating the resource has been fetched and transmitted in the message body. More info at https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    res.write('<h1 style="font-size: 3em;">This is home</h1>'); // this line is the body section of our server respond
    res.end(); // this line is important to end our server respond, which will stop the browser from continuously loading
});

server.listen(portNo, () => {
    console.log(`Server is running on port ${portNo}`);
});
*/


// by using the req, we can create custom server respond based on type of req from client
const server = http.createServer((req, res) => {
    const url = req.url.toLowerCase(); // this line extract the part of the url that comes after the domain name, for example:
    // for url http://localhost:portNo/home, will return /home
    // for url http://localhost:portNo/about, will return /about
    console.log(url);

    // using the url from previous line, we can custom server respond to the client
    if (url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write('<h1 style="font-size: 3em;">This is Home page</h1>');
        res.end();
        return; // this line will stop running the following code in case this argument is true
    }

    if (url === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write('<h1 style="font-size: 3em;">This is About Me page</h1>');
        res.end();
        return;
    }

    if (url === "/data") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(
            JSON.stringify({ name: "zafarudin", location: "Malaysia" })
            // to send JSON, we need to convert it to JSON string first
        );
        res.end();
        return;
    }

    if (url === "/github") {
        res.writeHead(301, { Location: "https://github.com/zafarudin481" }); // 301 is the http response code indicating the URL of requested resources has been changed permanently and new URL is given in the response (simple word: redirection). More info at https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        res.end();
        return;
    }

    // the following line will be executed (become default), if neither of the above if statement is true
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write('<h1 style="font-size: 3em;">404: Page not found</h1>');
    res.end();
})

server.listen(portNo, () => {
    console.log(`Server is running on port ${portNo}`);
});