const RandomTimeout = require("../../shared/helper/random-timeout.helper");
const RandomBoolean = require("../../shared/helper/random-boolean.helper");

const ELEMENT_ID = require("../../shared/const/element-id.const");

class BrowseFeedService {
  numberOfScrolls;

  constructor() {
    console.log("### STARTING BROWSE FEED SERVICE");
    // this.numberOfScrolls = Math.ceil(Math.random() * 50);
    this.numberOfScrolls = 1;
  }

  async startBrowsingFeed(page) {
    try {
      const feedButton = await page.$$(ELEMENT_ID.feedButton);

      await feedButton[0].click();
      await page.waitForSelector(ELEMENT_ID.feedPost, { visible: true });

      await this.scrollDown(page);
      await this.likePosts(page);

      if (this.numberOfScrolls > 0) {
        this.numberOfScrolls--;
        console.log("### BROWSING FEED AGAIN...");
        return await this.startBrowsingFeed(page);
      }
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

    for (const button of likeButtons) {
      await page.waitForTimeout(RandomTimeout.randomTimeout());

      if (RandomBoolean.randomBoolean(60)) {
        try {
          await button.click();
          console.log("### LIKED A POST");
        } catch (error) {}
      }
    }
  }
}

module.exports = BrowseFeedService;
