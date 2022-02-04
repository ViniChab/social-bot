const RandomTimeout = require("../../shared/helper/random-timeout.helper");
const Pensador = require("pensador-api");

const ELEMENT_ID = require("../../shared/const/element-id.const");

class PostService {
  constructor() {
    console.log("### STARTING POST SERVICE");
  }

  async createPost(page) {
    try {
      const feedButton = await page.$$(ELEMENT_ID.feedButton);

      await feedButton[0].click();
      await page.waitForSelector(ELEMENT_ID.feedPost, { visible: true });

      const startPostButton = await page.$$(ELEMENT_ID.startPostButton);

      await startPostButton[0].click();
      await page.waitForSelector(ELEMENT_ID.postInput, { visible: true });

      const phrasesArray = await Pensador({ term: "", max: 1 });

      const post = phrasesArray.phrases[0].text;
      const author = phrasesArray.phrases[0].author;

      await page.evaluate(
        (params) => {
          const postInput = document.querySelector(params.ELEMENT_ID.postInput);
          postInput.innerHTML = `${params.post} - ${params.author}`;
        },
        { post, author, ELEMENT_ID }
      );

      await page.waitForTimeout(RandomTimeout.randomTimeout());

      const finishPostButton = await page.$$(ELEMENT_ID.finishPostButton);
      await finishPostButton[0].click();

      console.log("### FINISHED POST SERVICE");
    } catch (error) {
      console.log(`### ERROR POSTING: ${error}`);
    }
  }
}

module.exports = PostService;
