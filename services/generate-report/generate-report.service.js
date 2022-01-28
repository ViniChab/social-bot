const PuppeteerService = require("../puppeteer/pupeteer.service");
const RandomTimeout = require("../../shared/helper/random-timeout.helper");
const fs = require("fs");

const ELEMENT_ID = require("../../shared/const/element-id.const");

class GenerateReportService {
  constructor() {
    this.puppeteerService = new PuppeteerService();
    console.log("### GENERATING NEW REPORT");
  }

  async generateReport(page) {
    await this.generateConnectionsReport(page);
    await this.generateViewsReport(page);
  }

  async generateConnectionsReport(page) {
    const myNetworkButton = await page.$$(ELEMENT_ID.myNetworkButton);

    await page.waitForTimeout(RandomTimeout.randomTimeout());
    await myNetworkButton[0].click();
    await page.waitForSelector(ELEMENT_ID.discoverList, {
      visible: true,
    });

    const connectionsElement = await page.$eval(
      ELEMENT_ID.summaryInfoContainer,
      (element) => element.getAttribute("aria-label")
    );

    const numberOfConnections = connectionsElement.split(" ")[1];
    await this.writeInfo(
      "report.txt",
      `NUMBER_OF_CONNECTIONS:${numberOfConnections};`
    );
  }

  async generateViewsReport(page) {
    const profileImageButton = await page.$$(ELEMENT_ID.profileImageButton);
    await profileImageButton[0].click();

    await page.waitForTimeout(RandomTimeout.randomTimeout(1_000, 500));

    const viewProfileButton = await page.$$(ELEMENT_ID.viewProfileButton);
    await viewProfileButton[0].click();

    await page.waitForSelector(ELEMENT_ID.experienceLogo, { visible: true });

    const profileViewsContainer = await page.$x(ELEMENT_ID.profileViews);
    const profileViews = await page.evaluate(
      (el) => el.textContent,
      profileViewsContainer[0]
    );

    await this.writeInfo(
      "report.txt",
      `PROFILE_VIEWS:${profileViews.trim().split(" ")[0]};`
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
