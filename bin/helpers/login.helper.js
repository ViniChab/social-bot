require("dotenv").config();

exports.login = (page) => {
  return new Promise(async (resolve, reject) => {
    await page.goto(process.env.LINKEDIN_URL);

    const usernameInput = await page.$$("input#session_key");
    const passwordInput = await page.$$("input#session_password");
    const loginButton = await page.$$("button.sign-in-form__submit-button");

    await usernameInput[0].type(process.env.LINKEDIN_USERNAME);
    await passwordInput[0].type(process.env.LINKEDIN_PASSWORD);
    await loginButton[0].click();

    resolve();
  });
};
