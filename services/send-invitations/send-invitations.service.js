const RandomTimeout = require("../../shared/helper/random-timeout.helper");
const RandomBoolean = require("../../shared/helper/random-boolean.helper");

const ELEMENT_ID = require("../../shared/const/element-id.const");

class SendInvitationsService {
  constructor() {
    console.log("### STARTING INVITATION SERVICE");
  }

  async startInvitationService(page) {
    try {
      const myNetworkButton = await page.$$(ELEMENT_ID.myNetworkButton);

      await myNetworkButton[0].click();
      await page.waitForSelector(ELEMENT_ID.youMayKnow, { visible: true });

      const youMayKnowButton = await page.$$(ELEMENT_ID.youMayKnow);
      await youMayKnowButton[0].click();

      await page.waitForSelector(ELEMENT_ID.connectButtons, { visible: true });

      const pageFrame = page.mainFrame();
      const connectButtons = await pageFrame.$$(ELEMENT_ID.connectButtons);

      await this.inviteRandomly(page, connectButtons);

      const dismissButton = await page.$$(ELEMENT_ID.connectModalCloseButton);
      await dismissButton[0].click();

      console.log("### FINISHED INVITATION SERVICE");
    } catch (error) {
      console.log(`### ERROR SENDING INVITATION: ${error}`);
    }
  }

  async inviteRandomly(page, connectButtons) {
    for (const button of connectButtons) {
      await page.waitForTimeout(RandomTimeout.randomTimeout());

      if (RandomBoolean.randomBoolean(75)) {
        try {
          await button.click();
          console.log("### INVITE SENT");
        } catch (error) {}
      }
    }
  }
}

module.exports = SendInvitationsService;
