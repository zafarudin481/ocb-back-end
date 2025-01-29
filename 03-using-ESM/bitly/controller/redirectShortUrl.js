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
    let fileData = JSON.parse(fileStringData);

    // find the index of long url for the short url using Array.findIndex
    const linkIndex = fileData.findIndex((linkIndex) => linkIndex.shortUrl === shortUrl);
    const link = fileData[linkIndex];
    let visitorCount = fileData[linkIndex].count;

    // const link = fileData.find((link) => link.shortUrl === shortUrl);

    // check whether the link is available or not, if not return 404 not found
    if (link == null || undefined) {
        const notFoundHtmlPath = path.join(process.cwd(), "pages", "404.html");
        const notFoundHtml = fs.readFileSync(notFoundHtmlPath, 'utf-8');

        res.setHeader("Content-Type", "text/html");
        res.status(404).send(notFoundHtml);
    } else {
        // add one to visitor count
        visitorCount++;
        fileData[linkIndex].count = visitorCount;

        // write the data to file link.json
        const stringData = JSON.stringify(fileData, null, 2);
        fs.writeFileSync(dataFilePath, stringData);

        // redirect the user to the long url
        const longUrl = link.url;
        res.status(301).redirect(longUrl);
    }
}

export default Redirect;