const findElement = (selector, innerText) => {
  const elements = Array.from(document.querySelectorAll(selector));

  if (!elements.length) {
    console.log(`### NO ELEMENTS FOUND WITH SELECTOR: ${selector}`);
  }

  elements.find((el) => el.textContent === innerText);
};

module.exports = findElement;
