const RandomTimeout = require("../../shared/helper/random-timeout.helper");

const ELEMENT_ID = require("../../shared/const/element-id.const");

class SendInvitationsService {
  constructor() {
    console.log("### STARTING INVITATION SERVICE");
  }

  async startInvitationService(page) {
    const myNetworkButton = await page.$$(ELEMENT_ID.myNetworkButton);

    await page.waitForTimeout(RandomTimeout.randomTimeout());
    await myNetworkButton[0].click();
    await page.waitForSelector(ELEMENT_ID.youMayKnowButton, { visible: true });

    const youMayKnowButton = await page.$$(ELEMENT_ID.youMayKnowButton);
    await youMayKnowButton[0].click();
  }
}

module.exports = SendInvitationsService;
