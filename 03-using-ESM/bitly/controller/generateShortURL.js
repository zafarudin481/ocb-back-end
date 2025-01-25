import crypto from "crypto";
import fs from "fs";
import path from "path";

function GenerateShortURL(req, res) {
    // TIPS: before writing your codes, write psudocode first
    // 1) get long URL from request body
    // 2) generate short URL
    // 3) the URL will consist 6 characters generate randomly using crypto module
    // 4) save long url and short url in file from JSON or database
    // 5) send the short url in response

    // get url from request body
    const url = req.body.url;

    // generate short url
    const randomString = crypto.randomBytes(3).toString('hex');
    const shortUrl = `${randomString}`;

    // save generated url in json
    const linksFilePath = path.join(process.cwd(), "model", "link.json");

    // read data from file
    const fileStringData = fs.readFileSync(linksFilePath, { encoding: "utf-8" });
    let fileData = JSON.parse(fileStringData);

    // combine existing data with the new data
    const newData = {
        url: url,
        shortUrl: shortUrl
    };
    fileData.push(newData);

    // write data to file
    const stringData = JSON.stringify(fileData, null, 2);
    fs.writeFileSync(linksFilePath, stringData);

    res.send(shortUrl);
}

export default GenerateShortURL;