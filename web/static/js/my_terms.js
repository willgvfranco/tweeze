const positiveWrapper = document.querySelector(".positive-wrapper");
const negativeWrapper = document.querySelector(".negative-wrapper");
const positiveInput = document.getElementById('positive-clipping-list');
const negativeInput = document.getElementById('negative-clipping-list');
const positiveForm = document.getElementById("positive-clipping-form");
const negativeForm = document.getElementById("negative-clipping-form");
const submitBtn = document.querySelector(".submit-btn");

let positiveClipping = [];
let jsonPositiveArr = JSON.stringify(positiveClipping);
let negativeClipping = [];
let jsonNegativeArr = JSON.stringify(negativeClipping);

localStorage.setItem("positiveClipping", jsonPositiveArr);
localStorage.setItem("negativeClipping", jsonNegativeArr);

positiveForm.addEventListener("submit", e => e.preventDefault());
negativeForm.addEventListener("submit", e => e.preventDefault());

const setToStorage = (type, array) => {
  jsonArr = JSON.stringify(array);
  switch (type) {
    case "positive":
      localStorage.setItem("positiveClipping", jsonArr);   
      break;   
    case "negative":
      localStorage.setItem("negativeClipping", jsonArr);  
      break;   
  }
};

const createItemText = (value, type) => {
  const newItem = document.createElement("li");
  const closeBtn = document.createElement("button");
  const icon = document.createElement("span");

  icon.innerText = "x";

  closeBtn.classList.add("close");
  closeBtn.dataset.dismiss = "modal"
  closeBtn.appendChild(icon);
  
  newItem.classList.add("key-word");
  newItem.innerHTML = "#" + value;

  closeBtn.addEventListener("click", e => {
    switch (type) {
      case "positive":
        positiveClipping.splice(positiveClipping.indexOf(value), 1);
        setToStorage(type, positiveClipping);
        newItem.parentElement.removeChild(newItem);
        break;
      case "negative":
        negativeClipping.splice(negativeClipping.indexOf(value), 1);
        setToStorage(type, negativeClipping);
        newItem.parentElement.removeChild(newItem);
        break;
    }
  });

  newItem.appendChild(closeBtn);
  return newItem;
};

positiveInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    positiveClipping.push(e.target.value);
    setToStorage("positive", positiveClipping);

    positiveWrapper.appendChild(createItemText(e.target.value, "positive"));
    e.target.value = "";
  }
});

negativeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    negativeClipping.push(e.target.value);
    setToStorage("negative", negativeClipping);

    negativeWrapper.appendChild(createItemText(e.target.value, "negative"));
    e.target.value = "";
  }
});
