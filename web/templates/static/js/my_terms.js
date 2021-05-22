const URL = document.URL;
const termSelect = document.getElementById("term-select");
const termSearch = document.querySelector(".nav-search");
const inputSearch = document.getElementById("term-search");
const groupName = document.getElementById("group-name");
const positiveWrapper = document.querySelector(".positive-wrapper");
const negativeWrapper = document.querySelector(".negative-wrapper");
const positiveInput = document.getElementById('positive-clipping-list');
const negativeInput = document.getElementById('negative-clipping-list');
const sendPositiveForm = document.getElementById("sendPositiveForm");
const sendNegativeForm = document.getElementById("sendNegativeForm");
const sendGroupId = document.getElementById("sendGroupId");
const termsForm = document.querySelector(".terms-form");
const submitBtn = document.querySelector(".submit-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const closeBtn = document.getElementById("close");
const editBtn = document.querySelectorAll(".edit-group");
let positiveClipping = [];
let negativeClipping = [];

sessionStorage.setItem("GRUPOS", JSON.stringify(GRUPOS));

editBtn.forEach(element => {
  element.addEventListener("click", () => {
    const groups = JSON.parse(sessionStorage.getItem("GRUPOS"));
    const selectedGroup = groups.find(group => group.id === parseFloat(element.id.split("-")[1]));

    sendGroupId.value = selectedGroup.id;
    groupName.value = selectedGroup.grupo;
    if (selectedGroup['positivas'][0] !== "") {
      positiveClipping = [...selectedGroup['positivas']];
    }
    if (selectedGroup['negativas'][0] !== "") {
      negativeClipping = [...selectedGroup['negativas']];
    }
    selectedGroup['positivas'].forEach(pos => {
      if (pos !== "") positiveWrapper.appendChild(createPosItem(pos));
    });
    selectedGroup['negativas'].forEach(neg => {
      if (neg !== "") negativeWrapper.appendChild(createNegItem(neg));
    });
  });
});


const getParams = (array) => {
  const params = {};
  array?.forEach(element => {
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

termsForm.addEventListener("keypress", e => {
  if (e.key === "Enter") e.preventDefault();
});
sendPositiveForm.addEventListener("submit", e => e.preventDefault());
sendNegativeForm.addEventListener("submit", e => e.preventDefault());

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
    sendPositiveForm.value = positiveClipping;
  }
});

negativeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    negativeClipping.push(e.target.value);
    negativeWrapper.appendChild(createNegItem(e.target.value));
    e.target.value = "";
    sendNegativeForm.value = negativeClipping;
  }
});

submitBtn.addEventListener("click", (e) => {
  if (!positiveClipping.length && !negativeClipping.length) {
    e.preventDefault();
  }
});

const resetData = () => {
  positiveWrapper.innerHTML = '';
  negativeWrapper.innerHTML = '';
  positiveClipping = [];
  negativeClipping = [];
  groupName.value = "";
};

cancelBtn.addEventListener("click", () => resetData());
closeBtn.addEventListener("click", () => resetData());
