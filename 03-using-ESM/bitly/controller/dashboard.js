import fs from "fs";
import path from "path";

function Dashboard(req, res) {
    // WRITE PSEUDO CODE
    // 1) read link.json file and obtain its data first
    // 2) using array.map, rearrange the file as a list
    // 3) insert the list into the html file
    // 4) used the updated html file as a server response to client

    // read data from link.json file
    const dataFilePath = path.join(process.cwd(), "model", "link.json");
    const dataStringFile = fs.readFileSync(dataFilePath, 'utf-8');
    const dataFile = JSON.parse(dataStringFile);

    // remap all data into html string
    const htmlTableList = dataFile.map((data) => (
        `<tr>
            <th scope="row">${data.shortUrl}</th>
            <td class="long-url">${data.url}</td>
            <td>${data.count}</td>
        </tr>`
    )).join("");

    // read html file and replace with actual list
    const dashboardPath = path.join(process.cwd(), "pages", "dashboard.html");
    let dashboard = fs.readFileSync(dashboardPath, 'utf-8');
    dashboard = dashboard.replace("[(LINK-LIST)]", htmlTableList);

    // send server response using updated html
    res.setHeader("Content-Type", "text/html");
    res.send(dashboard);
}

// exporting module using ESM
export default Dashboard;