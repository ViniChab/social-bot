const ELEMENT_ID = {
  sidebar: ".scaffold-layout__sidebar",
  usernameInput: "input#session_key",
  emailOrPhoneInput: "input#email-or-phone",
  passwordInput: "input#session_password",
  loginButton: "button.sign-in-form__submit-button",
  myNetworkButton: 'a[data-link-to="mynetwork"]',
  feedButton: 'a[data-link-to="feed"]',
  feedPost: ".feed-shared-update-v2",
  discoverList: ".discover-fluid-entity-list",
  summaryInfoContainer: ".mn-community-summary__info-container",
  profileImageButton: "button.artdeco-dropdown__trigger",
  viewProfileButton: "a[href='/in/pedro-augusto-dev/']",
  experienceLogo: "a[data-field='experience_company_logo']",
  profileViews: "//span[contains(., 'profile views')]",
  articleViews: "//span[contains(., 'article views')]",
  searchAppearances: "//span[contains(., 'search appearances')]",
  youMayKnow: 'button[aria-label="See all Software Engineers you may know"]',
  closeChatButton: "aside .msg-overlay-bubble-header button:nth-child(3n)",
  connectButtons:
    ".artdeco-modal__content .ember-view.display-flex footer button",
  connectModalCloseButton: 'button[aria-label="Dismiss"]',
  likeButtons: 'div span button[aria-pressed="false"]',
  startPostButton: ".share-box-feed-entry__trigger",
  postInput: ".ql-editor p",
  finishPostButton: ".share-box_actions button",
};

module.exports = ELEMENT_ID;
