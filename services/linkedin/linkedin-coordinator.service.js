const Puppeteer = require("puppeteer");
const PuppeteerService = require("../puppeteer/pupeteer.service");

const findElement = require("../../tools/find-element.tool");
const LINKEDIN_URL = "https://www.linkedin.com/";

class LinkedinCoordinatorService {
  puppeteerService;

  constructor() {
    console.log("### STARTING LINKEDIN SERVICE");
    this.puppeteerService = new PuppeteerService();
  }

  async startLinkedinService() {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(LINKEDIN_URL);
    this.puppeteerService.screenshot(page);
  }
}

module.exports = LinkedinCoordinatorService;
