const keywordsWrapper = document.querySelector(".key-words-wrapper");
const input = document.getElementById('clipping_list');
const form = document.getElementById("clipping-form");
const submitBtn = document.querySelector(".submit-btn");

let keywordsList = [];

form.addEventListener("submit", e => e.preventDefault());

const createItemText = value => {
  const newItem = document.createElement("li");
  const closeIcon = document.createElement("img");
  
  newItem.classList.add("key-word");
  newItem.innerHTML = "#" + value;

  closeIcon.setAttribute("src", CLOSE_ICON);
  closeIcon.addEventListener("click", e => {
    keywordsList.splice(keywordsList.indexOf(value), 1);
    newItem.parentElement.removeChild(newItem);
  });

  newItem.appendChild(closeIcon);
  return newItem;
};

input.addEventListener("keypress", (e) => {
  if (e.key === " ")  e.preventDefault();
  if (e.key === "Enter") {
    keywordsList.push(e.target.value);
    keywordsWrapper.appendChild(createItemText(e.target.value));
    e.target.value = "";
  }
});

submitBtn.addEventListener("click", e => {
  console.log(keywordsList);
});
