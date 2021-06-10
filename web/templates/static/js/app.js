const navToggle = document.querySelector(".nav-toggle");
const wrapper = document.querySelector(".wrapper");

const initialState = localStorage.getItem("menu");
const initialClass = wrapper.classList[1];

if (initialState === "") {
  wrapper.classList.remove("sidebar_minimize");
}

navToggle.addEventListener("click", (e) => {
  if (wrapper.classList[1] === "sidebar_minimize") {
    localStorage.setItem("menu", "sidebar_minimize");
  } else {
    localStorage.setItem("menu", "");
  }
});