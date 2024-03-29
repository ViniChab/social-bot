const RandomTimeout = require("../../shared/helper/random-timeout.helper");
const pensador = require("pensador-promise").default;

const ELEMENT_ID = require("../../shared/const/element-id.const");

class PostService {
  constructor() {
    console.log("### STARTING POST SERVICE");
  }

  async createPost(page) {
    try {
      const feedButton = await page.$$(ELEMENT_ID.feedButton);

      await feedButton[0].evaluate((b) => b.click());
      await page.waitForSelector(ELEMENT_ID.feedPost, { visible: true });

      const startPostButton = await page.$$(ELEMENT_ID.startPostButton);

      await startPostButton[0].evaluate((b) => b.click());
      await page.waitForSelector(ELEMENT_ID.postInput, { visible: true });
      console.log("pensador", pensador);

      const phrasesArray = await pensador({
        term: this.randomCharacter(),
        max: 21,
      });


      const position = Math.floor(Math.random() * 20);
      const post = phrasesArray.phrases[position].text;
      const author = phrasesArray.phrases[position].author;

      await page.evaluate(
        (params) => {
          const postInput = document.querySelector(params.ELEMENT_ID.postInput);
          postInput.innerHTML = `${params.post} - ${params.author}`;
        },
        { post, author, ELEMENT_ID }
      );

      await page.waitForTimeout(RandomTimeout.randomTimeout());

      const finishPostButton = await page.$$(ELEMENT_ID.finishPostButton);
      await finishPostButton[0].evaluate((b) => b.click());

      console.log("### FINISHED POST SERVICE");
    } catch (error) {
      console.log(`### ERROR POSTING: ${error}`);
    }
  }

  randomCharacter() {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;

    return characters.charAt(Math.floor(Math.random() * charactersLength));
  }
}

module.exports = PostService;
