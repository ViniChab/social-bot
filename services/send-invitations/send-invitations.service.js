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

      await page.waitForTimeout(RandomTimeout.randomTimeout());
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
    } catch (error) {
      console.log(`### ERROR GENERATING REPORT: ${error}`);
    }
  }

  async inviteRandomly(page, connectButtons) {
    await Promise.all(
      connectButtons.map(async (button) => {
        await page.waitForTimeout(RandomTimeout.randomTimeout());

        if (RandomBoolean.randomBoolean(75)) {
          await button.click();
        }
      })
    );
  }
}

module.exports = SendInvitationsService;
