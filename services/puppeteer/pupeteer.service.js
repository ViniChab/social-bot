const fs = require("fs");

class PuppeteerService {
  waitForBrowser(browserHandler) {
    if (!browserHandler) {
      throw new Error("browserHandler is not defined");
    }

    return new Promise((resolve, reject) => {
      const browserCheck = setInterval(() => {
        if (browserHandler.browser !== false) {
          clearInterval(browserCheck);
          resolve(true);
        }
      }, 200);
    });
  }

  async screenshot(page, fileName = "default-screenshot.png", path = "media") {
    try {
      fs.mkdirSync(path);
    } catch (e) {}

    await page.screenshot({ path: `${path}/${fileName}` });
  }
}

module.exports = PuppeteerService;
