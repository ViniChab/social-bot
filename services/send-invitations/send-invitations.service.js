require("dotenv").config();

const PuppeteerService = require("../puppeteer/pupeteer.service");

class SendInvitationsService {
  puppeteerService;
  page;

  constructor(page) {
    console.log("### STARTING INVITATION SERVICE");
    this.puppeteerService = new PuppeteerService();
    this.page = page;
  }

  async startInvitationService() {
    const myNetworkButton = await this.page.$$('a[data-link-to="mynetwork"]');
    await myNetworkButton[0].click();
    await this.page.waitForSelector(".discover-fluid-entity-list", {
      visible: true,
    });

    this.puppeteerService.screenshot(this.page, "my-network.png");
  }
}

module.exports = SendInvitationsService;
