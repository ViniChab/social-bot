const Puppeteer = require("puppeteer");

const LoginHelper = require("../../bin/helpers/login.helper");
const PuppeteerService = require("../puppeteer/pupeteer.service");
const GenerateReportService = require("../generate-report/generate-report.service");
const SendInvitationsService = require("../send-invitations/send-invitations.service");

class LinkedinCoordinatorService {
  puppeteerService;

  constructor() {
    console.log("### STARTING LINKEDIN SERVICE");
    this.puppeteerService = new PuppeteerService();
  }

  async startLinkedinService() {
    const browser = await Puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await this.login(page);
    await page.waitForTimeout(this.randomTimeout());
    await this.generateReport(page);
    await page.waitForTimeout(this.randomTimeout());

    // await this.startInvitationService(page);
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

  async generateReport(page) {
    const generateReportService = new GenerateReportService();
    await generateReportService.generateReport(page);
  }

  randomTimeout() {
    return Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000;
  }
}

module.exports = LinkedinCoordinatorService;
