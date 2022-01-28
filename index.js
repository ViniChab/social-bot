const PuppeteerService = require("./services/puppeteer/pupeteer.service");
const BrowserHandler = require("./services/browser-handler/browser-handler.service");
const LinkedinCoordinatorService = require("./services/linkedin-coordinator/linkedin-coordinator.service");

const Express = require("express");
const Path = require("path");

const port = process?.env?.PORT || 5100;
const app = Express();

app.get("/", (req, res) => {
  res.sendFile(Path.join(__dirname, "./pages", "main.html"));
});

app.listen(port, () => {
  console.log(`### API RESTARTED ON PORT: ${port}`);
  // main();
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
