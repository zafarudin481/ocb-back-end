import fs from "fs";
import path from "path";

function Dashboard(req, res) {
    // WRITE PSEUDO CODE
    // 1) read link.json file and obtain its data first
    // 2) using array.map, rearrange the file as a list
    // 3) insert the list into the html file
    // 4) used the updated html file as a server response to client

    // this is response operation
    const dashboardPath = path.join(process.cwd(), "pages", "dashboard.html");
    const dashboard = fs.readFileSync(dashboardPath, 'utf-8');

    res.send(dashboard);
}

// exporting module using ESM
export default Dashboard;