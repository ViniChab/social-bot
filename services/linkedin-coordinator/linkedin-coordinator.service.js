const Puppeteer = require("puppeteer");
const LoginHelper = require("../../shared/helper/login.helper");
const RandomTimeout = require("../../shared/helper/random-timeout.helper");
const PostService = require("../post/post.service");
const PuppeteerService = require("../puppeteer/pupeteer.service");
const BrowseFeedService = require("../browse-feed/browse-feed.service");
const GenerateReportService = require("../generate-report/generate-report.service");
const SendInvitationsService = require("../send-invitations/send-invitations.service");

const ELEMENT_ID = require("../../shared/const/element-id.const");
const RandomBoolean = require("../../shared/helper/random-boolean.helper");

class LinkedinCoordinatorService {
  puppeteerService;

  constructor() {
    console.log("### STARTING LINKEDIN SERVICE");
    this.puppeteerService = new PuppeteerService();
  }

  async startLinkedinService() {
    const browser = await Puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await this.login(page);
    await page.waitForTimeout(RandomTimeout.randomTimeout());
    this.closeChat(page);

    this.repeatForever(page);
  }

  async repeatForever(page) {
    while (true) {
      await page.waitForTimeout(RandomTimeout.randomTimeout(120_000, 100_000));
      await this.decideNextAction(page);
    }
  }

  async login(page) {
    await LoginHelper.login(page);
    await page.waitForSelector(ELEMENT_ID.sidebar, { visible: true });
    this.puppeteerService.screenshot(page, "after-login.png");
  }

  async closeChat(page) {
    const closeChatButton = await page.$$(ELEMENT_ID.closeChatButton);
    await closeChatButton[0].click();
  }

  async startInvitationService(page) {
    const sendInvitationsService = new SendInvitationsService(page);
    await sendInvitationsService.startInvitationService(page);
  }

  async generateReport(page) {
    const generateReportService = new GenerateReportService();
    await generateReportService.generateReport(page);
  }

  async startBrowsingFeed(page) {
    const browseFeedService = new BrowseFeedService();
    await browseFeedService.startBrowsingFeed(page);
  }

  async createPost(page) {
    const postService = new PostService();
    await postService.createPost(page);
  }

  async decideNextAction(page) {
    await page.waitForTimeout(RandomTimeout.randomTimeout());
    await this.generateReport(page);

    if (RandomBoolean.randomBoolean(50)) {
      if (RandomBoolean.randomBoolean(90)) {
        await page.waitForTimeout(RandomTimeout.randomTimeout());

        await this.startInvitationService(page);
        return;
      }

      if (RandomBoolean.randomBoolean(50)) {
        await page.waitForTimeout(RandomTimeout.randomTimeout());
        await this.createPost(page);
      }
      return;
    }

    await page.waitForTimeout(RandomTimeout.randomTimeout());
    await this.startBrowsingFeed(page);

    if (RandomBoolean.randomBoolean(3)) {
      await page.waitForTimeout(RandomTimeout.randomTimeout());
      await this.generateReport(page);
    }
  }
}

module.exports = LinkedinCoordinatorService;
