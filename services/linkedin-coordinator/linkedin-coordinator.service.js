const Puppeteer = require("puppeteer");

const LoginHelper = require("../../bin/helpers/login.helper");
const PuppeteerService = require("../puppeteer/pupeteer.service");
const SendInvitationsService = require("../send-invitations/send-invitations.service");

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
    await this.startInvitationService(page);
  }

  async login(page) {
    LoginHelper.login(page);
    await page.waitForSelector(".scaffold-layout__sidebar", { visible: true });
    this.puppeteerService.screenshot(page, "after-login.png");
  }

  async startInvitationService(page) {
    const sendInvitationsService = new SendInvitationsService(page);
    sendInvitationsService.startInvitationService();
  }
}

module.exports = LinkedinCoordinatorService;
