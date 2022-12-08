const form = document.querySelector("form") as HTMLFormElement;
const selectedRatingEl = document.querySelector(
  "#selected-rating"
) as HTMLSpanElement;

const mainPage = document.getElementById("rate-page") as HTMLElement;
const thankPage = document.getElementById("thank-page") as HTMLElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!(e.currentTarget instanceof HTMLFormElement)) return;

  const formData = new FormData(e.currentTarget);
  selectedRatingEl.innerText = formData.get("rating") as string;

  mainPage.classList.remove("active");
  thankPage.classList.add("active");
  const selectedRatingText = document.getElementById(
    "rating-text"
  ) as HTMLElement;

  selectedRatingText.ariaLabel = `You selected ${selectedRatingEl.innerText} of 5`;
  selectedRatingText.focus();
});

export {};
