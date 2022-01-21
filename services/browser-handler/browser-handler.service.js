const puppeteer = require("puppeteer");

class BrowserHandler {
  constructor() {
    const launch_browser = async () => {
      this.browser = false;
      this.browser = await puppeteer.launch();
      this.browser.on("disconnected", launch_browser);
    };

    (async () => {
      await launch_browser();
    })();
  }
}

module.exports = BrowserHandler;
