const form = document.querySelector("form") as HTMLFormElement;
const displayCCNumber = document.getElementById(
  "display-cc-number"
) as HTMLElement;
const displayCCName = document.getElementById("display-cc-name") as HTMLElement;
const displayCCExp = document.getElementById("display-expiry") as HTMLElement;
const displayCVC = document.getElementById("display-cvc") as HTMLElement;

const ccNumber = document.querySelector("input#cc-number") as HTMLInputElement;
const ccName = document.querySelector("input#cc-name") as HTMLInputElement;
const ccCVC = document.querySelector("input#cvc") as HTMLInputElement;
const ccExpMonth = document.querySelector(
  "input#expiry-month"
) as HTMLInputElement;
const ccExpYear = document.querySelector(
  "input#expiry-year"
) as HTMLInputElement;

ccNumber.addEventListener("input", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;
  const matched = e.target.value.padEnd(16, "0").match(/[A-Za-z0-9]{4}/gi);

  displayCCNumber.innerText = matched?.join(" ") ?? "";
});

ccName.addEventListener("input", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;

  displayCCName.innerText =
    e.target.value === "" ? "Jane Appleseed" : e.target.value;
});

ccExpMonth.addEventListener("input", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;

  const displayText = `${
    e.target.value === "" ? "00" : e.target.value.padEnd(2, "0")
  }/${displayCCExp.innerText.slice(3, 5)}`;

  displayCCExp.innerText = displayText;
});

ccExpYear.addEventListener("input", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;

  const displayText = `${displayCCExp.innerText.slice(0, 2)}/${
    e.target.value === "" ? "00" : e.target.value.padStart(2, "0")
  }`;

  displayCCExp.innerText = displayText;
});

ccCVC.addEventListener("input", (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;

  displayCVC.innerText =
    e.target.value === "" ? "000" : e.target.value.padEnd(3, "0");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!(e.currentTarget instanceof HTMLFormElement)) return;

  if (!ccName.validity.valid) {
    const errEl = document.querySelector("#cc-name-err") as HTMLElement;
    ccName.ariaInvalid = "true";
    ccName.classList.add("error");
    if (ccName.validity.valueMissing) errEl.innerText = "Can't be blank";
  }

  if (!ccNumber.validity.valid) {
    const errEl = document.querySelector("#cc-number-err") as HTMLElement;
    ccNumber.ariaInvalid = "true";
    ccNumber.classList.add("error");
    if (ccNumber.validity.valueMissing) errEl.innerText = "Can't be blank";
    if (ccNumber.validity.tooShort) errEl.innerText = "Too short";
    if (ccNumber.validity.patternMismatch)
      errEl.innerText = "Wrong format, numbers only";
  }

  if (!ccCVC.validity.valid) {
    const errEl = document.querySelector("#cvc-err") as HTMLElement;
    ccCVC.ariaInvalid = "true";
    ccCVC.classList.add("error");
    if (ccCVC.validity.valueMissing) errEl.innerText = "Can't be blank";
    if (ccCVC.validity.tooShort) errEl.innerText = "Too short";
    if (ccCVC.validity.patternMismatch)
      errEl.innerText = "Wrong format, numbers only";
  }

  if (!ccExpMonth.validity.valid) {
    const errEl = document.querySelector("#expiry-month-err") as HTMLElement;
    ccExpMonth.ariaInvalid = "true";
    ccExpMonth.classList.add("error");
    if (ccExpMonth.validity.valueMissing) errEl.innerText = "Can't be blank";
    if (ccExpMonth.validity.tooShort) errEl.innerText = "Too short";
    if (ccExpMonth.validity.patternMismatch)
      errEl.innerText = "Wrong format, numbers only";
  }

  if (!ccExpYear.validity.valid) {
    const errEl = document.querySelector("#expiry-year-err") as HTMLElement;
    ccExpYear.ariaInvalid = "true";
    ccExpYear.classList.add("error");
    if (ccExpYear.validity.valueMissing) errEl.innerText = "Can't be blank";
    if (ccExpYear.validity.tooShort) errEl.innerText = "Too short";
    if (ccExpYear.validity.patternMismatch)
      errEl.innerText = "Wrong format, numbers only";
  }

  // check validity and trigger invalid
  if (!form.checkValidity()) {
    // focus on first found errored field
    (
      form.querySelector("input[aria-invalid='true']") as HTMLInputElement
    ).focus();
  }
});

form.addEventListener("input", (e) => {
  if (!(e.currentTarget instanceof HTMLFormElement)) return;
  if (e.target instanceof HTMLInputElement && e.target.ariaInvalid) {
    e.target.ariaInvalid = "false";
    e.target.classList.remove("error");
    document.querySelector(`#${e.target.id}-err`)!.textContent = "";
  }
});

export {};
