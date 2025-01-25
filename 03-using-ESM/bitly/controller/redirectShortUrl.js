import fs from "fs";
import path from "path";

function Redirect(req, res) {
    // WRITE PSUDO CODE
    // 1) get the short url from the request parameter
    // 2) read file to get the long url from the short url
    // 3) redirect user to the long url

    // get the short url from the request parameter
    const shortUrl = req.params.shortUrl;

    // read data from file
    const dataFilePath = path.join(process.cwd(), "model", "link.json");
    const fileStringData = fs.readFileSync(dataFilePath, { encoding: "utf-8" });
    const fileData = JSON.parse(fileStringData);

    // find the long url for the short url using Array.find
    const link = fileData.find((link) => link.shortUrl === shortUrl);
    const longUrl = link.url;

    // redirect the user to the long url
    res.status(301).redirect(longUrl);
}

export default Redirect;