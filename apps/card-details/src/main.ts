const getElement = <T extends HTMLElement>(selector: string): T => {
  const el = document.querySelector(selector);
  // eslint-disable-next-line no-console
  if (!el) console.error(`Element with selector ${selector} doesn't exist!`);
  return el as T;
};

const appendText = (el: HTMLElement, text: string) => {
  el.appendChild(document.createTextNode(text));
};

const form = getElement<HTMLFormElement>("form");

const displayCCNumber = getElement("#display-cc-number");
const displayCCName = getElement("#display-cc-name");
const displayCCExp = getElement("#display-expiry");
const displayCVC = getElement("#display-cvc");

const ccNumber = getElement<HTMLInputElement>("input#cc-number");
const ccName = getElement<HTMLInputElement>("input#cc-name");
const ccCVC = getElement<HTMLInputElement>("input#cvc");
const ccExpMonth = getElement<HTMLInputElement>("input#expiry-month");
const ccExpYear = getElement<HTMLInputElement>("input#expiry-year");

const CC_LENGTH = 16;
const CC_DEFAULT_NAME = "Jane Appleseed";

const REQUIRED_ERROR_MSG = "can't be blank";
const WRONG_FORMAT_MSG = "wrong format, numbers only";

ccNumber.addEventListener("input", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;
  const matchPattern = /[A-Za-z0-9]{4}/gi;
  const matchedBlocks = e.target.value
    .padEnd(CC_LENGTH, "0")
    .match(matchPattern);
  displayCCNumber.innerText = matchedBlocks?.join(" ") ?? "";
});

ccName.addEventListener("input", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;
  const newValue = e.target.value;
  displayCCName.innerText = newValue === "" ? CC_DEFAULT_NAME : newValue;
});

ccExpMonth.addEventListener("input", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;

  const monthText = e.target.value.padEnd(2, "0");
  const yearText = displayCCExp.innerText.slice(3, 5);

  displayCCExp.innerText = `${monthText}/${yearText}`;
});

ccExpYear.addEventListener("input", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;

  const monthText = displayCCExp.innerText.slice(0, 2);
  const yearText = e.target.value.padStart(2, "0");

  displayCCExp.innerText = `${monthText}/${yearText}`;
});

ccCVC.addEventListener("input", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;
  displayCVC.innerText = e.target.value.padEnd(3, "0");
});

const setInvalid = <T extends HTMLElement>(el: T) => {
  el.setAttribute("aria-invalid", "true");
  el.classList.add("detail-form__input--invalid");
};

const unsetInvalid = <T extends HTMLElement>(el: T) => {
  el.setAttribute("aria-invalid", "false");
  el.classList.remove("detail-form__input--invalid");
  getElement(`#${el.id}-err`).innerText = "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!(e.currentTarget instanceof HTMLFormElement)) return;

  Array.from(form.querySelectorAll("input")).forEach((el) => {
    unsetInvalid(el);
  });

  if (!ccName.validity.valid) {
    const errEl = getElement("#cc-name-err");
    setInvalid(ccName);
    if (ccName.validity.valueMissing)
      appendText(errEl, `Carholder name ${REQUIRED_ERROR_MSG}`);
  }

  if (!ccNumber.validity.valid) {
    const errEl = getElement("#cc-number-err");
    setInvalid(ccNumber);

    let errMsg = "";
    if (ccNumber.validity.valueMissing)
      errMsg = `Card number ${REQUIRED_ERROR_MSG}`;
    if (ccNumber.validity.patternMismatch)
      errMsg = `Card number is in a ${WRONG_FORMAT_MSG}`;
    if (ccNumber.validity.tooShort)
      errMsg = `Card number must have ${CC_LENGTH} digits`;

    appendText(errEl, errMsg);
  }

  if (!ccCVC.validity.valid) {
    const errEl = getElement("#cvc-err");
    setInvalid(ccCVC);

    let errMsg = "";
    if (ccCVC.validity.valueMissing) errMsg = `CVC ${REQUIRED_ERROR_MSG}`;
    if (ccCVC.validity.patternMismatch)
      errMsg = `CVC is in a ${WRONG_FORMAT_MSG}`;
    if (ccCVC.validity.tooShort) errMsg = "CVC must have 3 digits";

    appendText(errEl, errMsg);
  }

  if (!ccExpMonth.validity.valid) {
    const errEl = getElement("#expiry-month-err");
    setInvalid(ccExpMonth);

    let errMsg = "";
    if (ccExpMonth.validity.valueMissing)
      errMsg = `Expiry Month ${REQUIRED_ERROR_MSG}`;
    if (ccExpMonth.validity.patternMismatch)
      errMsg = `Expiry Month is in a ${WRONG_FORMAT_MSG}`;
    if (ccExpMonth.validity.tooShort)
      errMsg = "Expiry month must have 2 digits";

    appendText(errEl, errMsg);
  }

  if (!ccExpYear.validity.valid) {
    const errEl = getElement("#expiry-year-err");
    setInvalid(ccExpYear);

    let errMsg = "";
    if (ccExpYear.validity.valueMissing)
      errMsg = `Expiry year ${REQUIRED_ERROR_MSG}`;
    if (ccExpYear.validity.patternMismatch)
      errMsg = `Expiry year is in a ${WRONG_FORMAT_MSG}`;
    if (ccExpYear.validity.tooShort) errMsg = "Expiry year must have 2 digits";

    appendText(errEl, errMsg);
  }

  // check validity and trigger invalid
  if (!form.checkValidity()) {
    // focus on first found errored field
    getElement<HTMLInputElement>("input[aria-invalid='true']").focus();
  }
});

form.addEventListener("input", (e) => {
  const targetEl = e.target;
  if (targetEl instanceof HTMLInputElement && targetEl.ariaInvalid) {
    unsetInvalid(targetEl);
  }
});

export {};
