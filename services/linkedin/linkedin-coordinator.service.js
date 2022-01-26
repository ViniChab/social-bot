const Puppeteer = require("puppeteer");
const PuppeteerService = require("../puppeteer/pupeteer.service");
const LoginHelper = require("../../bin/helpers/login.helper");

class LinkedinCoordinatorService {
  puppeteerService;

  constructor() {
    console.log("### STARTING LINKEDIN SERVICE");
    this.puppeteerService = new PuppeteerService();
  }

  async startLinkedinService() {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();

    await this.login(page);
  }

  async login(page) {
    LoginHelper.login(page);
    await page.waitForSelector(".scaffold-layout__sidebar", { visible: true });
    this.puppeteerService.screenshot(page, "after-login.png");
  }
}

module.exports = LinkedinCoordinatorService;
