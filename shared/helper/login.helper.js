const RandomTimeout = require("./random-timeout.helper");
const ELEMENT_ID = require("../const/element-id.const");
require("dotenv").config();

exports.login = (page) => {
  return new Promise(async (resolve, reject) => {
    await page.goto(process.env.LINKEDIN_URL);
    await page.waitForTimeout(2000);

    const usernameInput = await page.$$(ELEMENT_ID.usernameInput);
    const emailOrPhoneInput = await page.$$(ELEMENT_ID.emailOrPhoneInput);
    const passwordInput = await page.$$(ELEMENT_ID.passwordInput);
    const loginButton = await page.$$(ELEMENT_ID.loginButton);

    await usernameInput[0]?.type(process.env.LINKEDIN_USERNAME);
    await emailOrPhoneInput[0]?.type(process.env.LINKEDIN_USERNAME);
    await passwordInput[0].type(process.env.LINKEDIN_PASSWORD);
    await loginButton[0].click();

    resolve();
  });
};
