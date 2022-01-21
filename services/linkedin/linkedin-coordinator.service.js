const Puppeteer = require("puppeteer");
const PuppeteerService = require("../puppeteer/pupeteer.service");

class LinkedinCoordinatorService {
  puppeteerService;

  constructor() {
    console.log("### STARTING LINKEDIN SERVICE");
    this.puppeteerService = new PuppeteerService();
  }

  async startLinkedinService() {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.linkedin.com/");
    this.puppeteerService.screenshot(page);
  }
}

module.exports = LinkedinCoordinatorService;
