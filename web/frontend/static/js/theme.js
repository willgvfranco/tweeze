const body = document.body;
const lightBtn = document.getElementById("themeWhite");
const darkBtn = document.getElementById("themeDark");

const selectedTheme = localStorage.getItem("dashboardTheme");
if (!selectedTheme) {
  body.dataset.backgroundColor = "light";
  localStorage.setItem("dashboardTheme", "light");
  lightBtn.classList.remove("hidden");
  lightBtn.classList.add("selected");
  darkBtn.classList.add("hidden");
}
else if (selectedTheme === "light") {
  body.dataset.backgroundColor = "light";
  darkBtn.classList.add("hidden");
  darkBtn.classList.remove("selected");
  lightBtn.classList.remove("hidden");
  lightBtn.classList.add("selected");
}
else if (selectedTheme === "dark") {
  body.dataset.backgroundColor = "dark";
  lightBtn.classList.add("hidden");
  lightBtn.classList.remove("selected");
  darkBtn.classList.remove("hidden");
  darkBtn.classList.add("selected");
}

lightBtn.addEventListener("click", () => {
  localStorage.setItem("dashboardTheme", "dark");
  darkBtn.classList.remove("hidden");
  darkBtn.classList.add("selected");
  lightBtn.classList.add("hidden");
  lightBtn.classList.remove("selected");
});

darkBtn.addEventListener("click", () => {
  localStorage.setItem("dashboardTheme", "light");
  lightBtn.classList.remove("hidden");
  lightBtn.classList.add("selected");
  darkBtn.classList.add("hidden");
  darkBtn.classList.remove("selected");
});
