const Puppeteer = require("puppeteer");
const PuppeteerService = require("../puppeteer/pupeteer.service");

fs = require("fs");

class GenerateReportService {
  constructor() {
    this.puppeteerService = new PuppeteerService();
    console.log("### GENERATING NEW REPORT");
  }

  async generateReport(page) {
    await this.generateConnectionsReport(page);
  }

  async generateConnectionsReport(page) {
    const myNetworkButton = await page.$$('a[data-link-to="mynetwork"]');

    await page.waitForTimeout(1000);
    await myNetworkButton[0].click();
    await page.waitForSelector(".discover-fluid-entity-list", {
      visible: true,
    });

    const connectionsElement = await page.$eval(
      ".mn-community-summary__info-container",
      (element) => element.getAttribute("aria-label")
    );

    const numberOfConnections = connectionsElement.split(" ")[1];
    await this.writeInfo(
      "report.txt",
      `NUMBER_OF_CONNECTIONS:${numberOfConnections};`
    );
  }

  async writeInfo(filename = "report.txt", content) {
    try {
      fs.mkdirSync("reports");
      fs.writeFile(`reports/${filename}`, "", (er) => {});
    } catch (e) {}

    fs.appendFile(`reports/${filename}`, content, (er) => {});
  }
}

module.exports = GenerateReportService;
