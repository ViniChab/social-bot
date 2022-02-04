const Puppeteer = require("puppeteer");
const LoginHelper = require("../../shared/helper/login.helper");
const RandomTimeout = require("../../shared/helper/random-timeout.helper");
const PuppeteerService = require("../puppeteer/pupeteer.service");
const GenerateReportService = require("../generate-report/generate-report.service");
const SendInvitationsService = require("../send-invitations/send-invitations.service");

const ELEMENT_ID = require("../../shared/const/element-id.const");

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
    await page.waitForTimeout(RandomTimeout.randomTimeout());
    this.closeChat(page);
    // await page.waitForTimeout(RandomTimeout.randomTimeout(0, 1));
    // await this.generateReport(page);
    await page.waitForTimeout(RandomTimeout.randomTimeout());
    await this.startInvitationService(page);
  }

  async login(page) {
    LoginHelper.login(page);
    await page.waitForSelector(ELEMENT_ID.sidebar, { visible: true });
    this.puppeteerService.screenshot(page, "after-login.png");
  }

  async closeChat(page) {
    const closeChatButton = await page.$$(ELEMENT_ID.closeChatButton);
    await closeChatButton[0].click();
  }

  async startInvitationService(page) {
    const sendInvitationsService = new SendInvitationsService(page);
    sendInvitationsService.startInvitationService(page);
  }

  async generateReport(page) {
    const generateReportService = new GenerateReportService();
    await generateReportService.generateReport(page);
  }
}

module.exports = LinkedinCoordinatorService;
