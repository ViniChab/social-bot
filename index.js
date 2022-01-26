const PuppeteerService = require("./services/puppeteer/pupeteer.service");
const BrowserHandler = require("./services/browser-handler/browser-handler.service");
const LinkedinCoordinatorService = require("./services/linkedin/linkedin-coordinator.service");

const port = process?.env?.PORT || 5100;
const Express = require("express");
const app = Express();

app.listen(port, () => {
  console.log(`### API RESTARTED ON PORT: ${port}`);
  main();
});

// Main
async function main() {
  const browserHandler = new BrowserHandler();
  const puppeteerService = new PuppeteerService();
  const linkedinService = new LinkedinCoordinatorService();

  console.log("### WAITING FOR PUPPETEER");
  await puppeteerService.waitForBrowser(browserHandler);
  console.log("### PUPPETEER STARTED");

  linkedinService.startLinkedinService();
}
