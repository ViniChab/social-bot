const Puppeteer = require("puppeteer");
const PuppeteerService = require("../puppeteer/pupeteer.service");
const LoginService = require("./login/linkedin-login.service");

class LinkedinCoordinatorService {
  puppeteerService;

  constructor() {
    console.log("### STARTING LINKEDIN SERVICE");
    this.puppeteerService = new PuppeteerService();
  }

  async startLinkedinService() {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();

    LoginService.login(page);

    setTimeout(() => {
      this.puppeteerService.screenshot(page, 'after-login.png');
    }, 1500);
  }
}

module.exports = LinkedinCoordinatorService;
