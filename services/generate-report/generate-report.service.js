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
    try {
      await this.writeInfo(
        "report.txt",
        `REPORT_TIME:${new Date().toISOString().replace(/:/g, "#")};` // Using a replaceAll here to it's easier to parse this data later on
      );

      await this.goToMyConnectinsPage(page);
      await this.generateConnectionsReport(page);
      await this.goToProfilePage(page);
      await this.generateViewsReport(page);
      await this.generateArticleReport(page); // For some reason, the articles data isn't showing
      await this.generateSearchReport(page);

      await this.writeInfo();

      console.log(`### REPORT GENERATED AT ${new Date().toISOString()}`);
    } catch (error) {
      console.log(`### ERROR GENERATING REPORT: ${error}`);
      await this.writeInfo();
    }
  }

  async generateConnectionsReport(page) {
    const connectionsElement = await page.$eval(
      ELEMENT_ID.summaryInfoContainer,
      (element) => element.innerText
    );

    const numberOfConnections = connectionsElement.split("\n")[1];
    await this.writeInfo(
      "report.txt",
      `NUMBER_OF_CONNECTIONS:${numberOfConnections};`
    );
  }

  async goToMyConnectinsPage(page) {
    const myNetworkButton = await page.$$(ELEMENT_ID.myNetworkButton);

    await page.waitForTimeout(RandomTimeout.randomTimeout());
    await myNetworkButton[0].click();
    await page.waitForSelector(ELEMENT_ID.discoverList, { visible: true });
  }

  async goToProfilePage(page) {
    const profileImageButton = await page.$$(ELEMENT_ID.profileImageButton);
    await profileImageButton[0].click();

    await page.waitForTimeout(RandomTimeout.randomTimeout(1_000, 900)); // Just for the option to show on screen, way more time than necessary

    const viewProfileButton = await page.$$(ELEMENT_ID.viewProfileButton);
    await viewProfileButton[0].click();

    await page.waitForSelector(ELEMENT_ID.experienceLogo, { visible: true });
  }

  async generateViewsReport(page) {
    const profileViewsContainer = await page.$x(ELEMENT_ID.profileViews);
    const profileViews = await page.evaluate(
      (el) => el.innerText,
      profileViewsContainer[0]
    );

    await this.writeInfo(
      "report.txt",
      `PROFILE_VIEWS:${this.getDataFromText(profileViews)};`
    );
  }

  async generateArticleReport(page) {
    const articleViewsContainer = await page.$x(ELEMENT_ID.articleViews);
    const articleViews = await page.evaluate(
      (el) => el.innerText,
      articleViewsContainer[0]
    );

    await this.writeInfo(
      "report.txt",
      `POST_VIEWS:${this.getDataFromText(articleViews)};`
    );
  }

  async generateSearchReport(page) {
    const searchAppearancesContainer = await page.$x(
      ELEMENT_ID.searchAppearances
    );
    const searchAppearances = await page.evaluate(
      (el) => el.innerText,
      searchAppearancesContainer[0]
    );

    await this.writeInfo(
      "report.txt",
      `SEARCH_APPEARANCES:${this.getDataFromText(searchAppearances)};`
    );
  }

  async writeInfo(filename = "report.txt", content = "\n") {
    try {
      fs.mkdirSync("reports");
      fs.writeFile(`reports/${filename}`, "", (er) => {});
    } catch (e) {}

    fs.appendFile(`reports/${filename}`, content, (er) => {});
  }

  getDataFromText(text) {
    return text.trim().split(" ")[0];
  }
}

module.exports = GenerateReportService;
