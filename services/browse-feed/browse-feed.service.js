const RandomTimeout = require("../../shared/helper/random-timeout.helper");
const RandomBoolean = require("../../shared/helper/random-boolean.helper");

const ELEMENT_ID = require("../../shared/const/element-id.const");

class BrowseFeedService {
  constructor() {
    console.log("### STARTING BROWSE FEED SERVICE");
  }

  async startBrowsingFeed(page) {
    try {
      await this.scrollDown(page);
      await this.likePosts(page);
      console.log("### FINISHED BROWSE FEED SERVICE");
    } catch (error) {
      console.log(`### ERROR BROWSING FEED: ${error}`);
    }
  }

  async scrollDown(page) {
    await Promise.all(
      [1, 2, 3, 4, 5, 6, 7].map(async () => {
        await page.waitForTimeout(RandomTimeout.randomTimeout());

        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight);
        });
      })
    );
  }

  async likePosts(page) {
    const pageFrame = page.mainFrame();
    const likeButtons = await pageFrame.$$(ELEMENT_ID.likeButtons);

    await Promise.all(
      likeButtons.map(async (button) => {
        await page.waitForTimeout(RandomTimeout.randomTimeout());

        if (RandomBoolean.randomBoolean(80)) {
          await button.click();
        }
      })
    );
  }
}

module.exports = BrowseFeedService;
