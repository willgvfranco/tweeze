const URL = document.URL;
const termSelect = document.getElementById("term-select");
const termSearch = document.querySelector(".nav-search");
const inputSearch = document.getElementById("term-search");
const positiveWrapper = document.querySelector(".positive-wrapper");
const negativeWrapper = document.querySelector(".negative-wrapper");
const positiveInput = document.getElementById('positive-clipping-list');
const negativeInput = document.getElementById('negative-clipping-list');
const positiveForm = document.getElementById("positive-clipping-form");
const negativeForm = document.getElementById("negative-clipping-form");
const submitBtn = document.querySelector(".submit-btn");
const cancelBtn = document.querySelector(".cancel-btn");
let positiveClipping = [];
let negativeClipping = [];

const getParams = (array) => {
  const params = {};
  array.forEach(element => {
    params[element.split("=")[0]] = element.split("=")[1];
  });
  return params;
};

const urlObj = {
  url: URL.split("?")[0],
  params: getParams(URL.split("?")[1]?.split("&")),
};

if (urlObj.params?.type) {
  if (urlObj.params.type === "all") {
    termSelect.options[0].selected = true;
  } else if (urlObj.params.type === "positive") {
    termSelect.options[1].selected = true;
  } else if (urlObj.params.type === "negative") {
    termSelect.options[2].selected = true;
  }
}

positiveForm.addEventListener("submit", e => e.preventDefault());
negativeForm.addEventListener("submit", e => e.preventDefault());

termSelect.addEventListener("change", (e) => {
  let selected = "all";
  if (e.target.value === "Todos os termos") {
    selected = "all";
  } else if (e.target.value === "Somente positivos") {
    selected = "positive";    
  } else if (e.target.value === "Somente negativos") {
    selected = "negative";
  }

  urlObj.params.type = selected;
  console.log('urlObj', urlObj);
  reloadWithParams();
});

termSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    urlObj.params.search = e.target.value;
    console.log('urlObj', urlObj)
    reloadWithParams();
  }
});

const reloadWithParams = () => {
  let newUrl = urlObj.url;
  if (urlObj.params?.type && urlObj.params?.search) {
    newUrl = `${urlObj.url}?type=${urlObj.params.type}&search=${urlObj.params.search}`;
  } else if (urlObj.params?.type && !urlObj.params?.search) {
    newUrl = `${urlObj.url}?type=${urlObj.params.type}`;
  } else if (!urlObj.params?.type && urlObj.params?.search) {
    newUrl = `${urlObj.url}?search=${urlObj.params.search}`;
  }
  location.replace(newUrl);
};

const createNegItem = value => {
  const newItem = document.createElement("li");
  const closeBtn = document.createElement("span");
  const icon = document.createElement("span");

  icon.innerText = "x";
  closeBtn.classList.add("close");
  closeBtn.appendChild(icon);
  
  newItem.classList.add("key-word");
  newItem.innerHTML = "#" + value;

  closeBtn.addEventListener("click", e => {
    negativeClipping.splice(negativeClipping.indexOf(value), 1);
    newItem.parentElement.removeChild(newItem);
  });

  newItem.appendChild(closeBtn);
  return newItem;
};

const createPosItem = value => {
  const newItem = document.createElement("li");
  const closeBtn = document.createElement("span");
  const icon = document.createElement("span");

  icon.innerText = "x";
  closeBtn.classList.add("close");
  closeBtn.appendChild(icon);
  
  newItem.classList.add("key-word");
  newItem.innerHTML = "#" + value;

  closeBtn.addEventListener("click", e => {
    positiveClipping.splice(positiveClipping.indexOf(value), 1);
    newItem.parentElement.removeChild(newItem);
  });

  newItem.appendChild(closeBtn);
  return newItem;
};

positiveInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    positiveClipping.push(e.target.value);
    positiveWrapper.appendChild(createPosItem(e.target.value));
    e.target.value = "";
  }
});

negativeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    negativeClipping.push(e.target.value);
    negativeWrapper.appendChild(createNegItem(e.target.value));
    e.target.value = "";
  }
});

submitBtn.addEventListener("click", () => {
  if (!positiveClipping.length && !negativeClipping.length) {
    console.log("Please add search terms.");
  } else {
    console.log("SUBMIT");
  }
});

cancelBtn.addEventListener("click", () => console.log("CANCEL"));
