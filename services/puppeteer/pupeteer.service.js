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
}

module.exports = PuppeteerService;
