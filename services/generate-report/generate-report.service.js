fs = require("fs");

class GenerateReportService {
  constructor() {
    console.log("### GENERATING NEW REPORT");
  }

  async generateReport(path = "reports", filename = "report.txt", content) {
    try {
      fs.mkdirSync(path);
      fs.writeFile(`${path}/${filename}`, "## Report start\n", (er) => {});
    } catch (e) {}

    fs.appendFile(`${path}/${filename}`, content, (er) => {});
  }
}

module.exports = GenerateReportService;
