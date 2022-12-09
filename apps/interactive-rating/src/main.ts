const form = document.querySelector("form") as HTMLFormElement;
const selectedRatingEl = document.querySelector(
  "#selected-rating"
) as HTMLSpanElement;

const mainPage = document.getElementById("rate") as HTMLElement;
const thankPage = document.getElementById("thank") as HTMLElement;
const ratingStatus = document.getElementById("rating-status") as HTMLElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!(e.currentTarget instanceof HTMLFormElement)) return;

  const formData = new FormData(e.currentTarget);
  selectedRatingEl.innerText = formData.get("rating") as string;

  mainPage.classList.remove("active");
  thankPage.classList.add("active");

  ratingStatus.innerText = `You selected ${selectedRatingEl.innerText} out of 5`;
});

export {};
