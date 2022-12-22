const monthlyPricesData = [
  { pageviews: 10000, price: 8, currency: "USD" },
  { pageviews: 50000, price: 12, currency: "USD" },
  { pageviews: 100000, price: 16, currency: "USD" },
  { pageviews: 500000, price: 24, currency: "USD" },
  { pageviews: 1000000, price: 36, currency: "USD" },
];

const formatPrice = (price: string | number, currency: string) =>
  Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(Number(price));

const formatViews = (views: number) =>
  Intl.NumberFormat(navigator.language, { notation: "compact" }).format(views);

const pricingSlider = document.querySelector(
  'input[type="range"]'
) as HTMLInputElement;
const form = document.querySelector("form") as HTMLFormElement;
const pageViewEl = document.querySelector("#pageviews") as HTMLElement;
const priceEl = document.querySelector("#price") as HTMLElement;

const updateDOMValues = () => {
  const formData = new FormData(form);
  const rangeVal = formData.get("pricing-slider") as string;
  const frequency = formData.get("frequency") as string;

  const priceDataIdx = Number(rangeVal) - 1;
  const { pageviews, currency, price } = monthlyPricesData[priceDataIdx];

  const min = Number(pricingSlider.min);
  const max = Number(pricingSlider.max);
  const sliderVal = Number(pricingSlider.value);
  const sliderGradientPercentage = `${
    ((sliderVal - min) * 100) / (max - min)
  }% 100%`;

  const finalPrice = formatPrice(
    price * (frequency === "yearly" ? 0.75 : 1),
    currency
  );
  const finalPageViews = formatViews(pageviews);

  priceEl.innerText = finalPrice;
  pageViewEl.innerText = finalPageViews;

  pricingSlider.ariaValueNow = rangeVal;
  pricingSlider.ariaValueText = `${finalPageViews} pageviews for ${finalPrice} per month`;
  pricingSlider.style.backgroundSize = sliderGradientPercentage;
};

form.addEventListener("input", updateDOMValues);
window.addEventListener("DOMContentLoaded", updateDOMValues);

export {};
