import fs from "fs";
import path from "path";

function Dashboard(req, res) {
    const dashboardPath = path.join(process.cwd(), "pages", "dashboard.html");
    const dashboard = fs.readFileSync(dashboardPath, 'utf-8');

    res.send(dashboard);
}

// exporting module using ESM
export default Dashboard;