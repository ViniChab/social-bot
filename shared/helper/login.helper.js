const RandomTimeout = require("./random-timeout.helper");
const ELEMENT_ID = require("../const/element-id.const");
require("dotenv").config();

exports.login = (page) => {
  return new Promise(async (resolve, reject) => {
    await page.goto(process.env.LINKEDIN_URL);
    await page.waitForSelector(ELEMENT_ID.usernameInput, { visible: true });
    await page.waitForTimeout(RandomTimeout.randomTimeout(1_000, 1_500));

    const usernameInput = await page.$$(ELEMENT_ID.usernameInput);
    const passwordInput = await page.$$(ELEMENT_ID.passwordInput);
    const loginButton = await page.$$(ELEMENT_ID.loginButton);

    await usernameInput[0].type(process.env.LINKEDIN_USERNAME);
    await passwordInput[0].type(process.env.LINKEDIN_PASSWORD);
    await loginButton[0].click();

    resolve();
  });
};
