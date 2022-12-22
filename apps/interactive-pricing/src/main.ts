const monthlyPrices = [
  { pageviews: 10000, price: 8, currency: "USD" },
  { pageviews: 50000, price: 12, currency: "USD" },
  { pageviews: 100000, price: 16, currency: "USD" },
  { pageviews: 500000, price: 24, currency: "USD" },
  { pageviews: 1000000, price: 36, currency: "USD" },
];

const locale = navigator.language;
const formatPrice = (price: string | number, currency: string) =>
  Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Number(price));

const formatViews = (views: number) =>
  Intl.NumberFormat(locale, { notation: "compact" }).format(views);

const rangeInputs = document.querySelector(
  'input[type="range"]'
) as HTMLInputElement;

const form = document.querySelector("form") as HTMLFormElement;

const pageViewEl = document.querySelector("#pageviews") as HTMLElement;
const priceEl = document.querySelector("#price") as HTMLElement;

form.addEventListener("input", (e) => {
  if (!(e.currentTarget instanceof HTMLFormElement)) return;
  const formData = new FormData(e.currentTarget);
  const rangeVal = formData.get("pricing-slider");
  const frequency = formData.get("frequency");

  const priceObj = monthlyPrices[Number(rangeVal) - 1];

  const { min, max, value } = rangeInputs;
  rangeInputs.style.backgroundSize = `${
    ((Number(value) - Number(min)) * 100) / (Number(max) - Number(min))
  }% 100%`;

  priceEl.innerText = formatPrice(
    priceObj.price * (frequency === "yearly" ? 0.75 : 1),
    priceObj.currency
  );

  pageViewEl.innerText = formatViews(priceObj.pageviews);
});

window.addEventListener("DOMContentLoaded", () => {
  const formData = new FormData(form);
  const rangeVal = formData.get("pricing-slider");
  const frequency = formData.get("frequency");

  const priceObj = monthlyPrices[Number(rangeVal) - 1];

  const { min, max, value } = rangeInputs;
  rangeInputs.style.backgroundSize = `${
    ((Number(value) - Number(min)) * 100) / (Number(max) - Number(min))
  }% 100%`;

  priceEl.innerText = formatPrice(
    priceObj.price * (frequency === "yearly" ? 0.75 : 1),
    priceObj.currency
  );

  pageViewEl.innerText = formatViews(priceObj.pageviews);
});

export {};
