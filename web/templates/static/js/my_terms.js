sessionStorage.setItem("GRUPOS", JSON.stringify(GRUPOS));

const UrlParamsHandler = () => {
  const URL = document.URL;
  const termSelect = document.getElementById("term-select");

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
  
  if (urlObj.params?.type) {
    if (urlObj.params.type === "all") {
      termSelect.options[0].selected = true;
    } else if (urlObj.params.type === "positive") {
      termSelect.options[1].selected = true;
    } else if (urlObj.params.type === "negative") {
      termSelect.options[2].selected = true;
    }
  }

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
  
  document.querySelector(".nav-search").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      urlObj.params.search = e.target.value;
      console.log('urlObj', urlObj)
      reloadWithParams();
    }
  });
};

const createGroupHandler = () => {
  const groupName = document.getElementById("create-group-name");
  const positiveWrapper = document.querySelector("#create-group .positive-wrapper");
  const negativeWrapper = document.querySelector("#create-group .negative-wrapper");
  const sendPositiveForm = document.getElementById("create_positives");
  const sendNegativeForm = document.getElementById("create_negatives");

  let positiveClipping = [];
  let negativeClipping = [];

  const resetData = () => {
    positiveWrapper.innerHTML = '';
    negativeWrapper.innerHTML = '';
    positiveClipping = [];
    negativeClipping = [];
    groupName.value = "";
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

  sendPositiveForm.addEventListener("submit", e => e.preventDefault());
  sendNegativeForm.addEventListener("submit", e => e.preventDefault());
  document.querySelector("#create-group .cancel-btn").addEventListener("click", () => resetData());
  document.querySelector("#create-group .close").addEventListener("click", () => resetData());
  document.querySelector("#create-group .terms-form").addEventListener("keypress", e => {
    if (e.key === "Enter") e.preventDefault();
  });
  
  document.getElementById('create-positives').addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      positiveClipping.push(e.target.value);
      positiveWrapper.appendChild(createPosItem(e.target.value));
      e.target.value = "";
      sendPositiveForm.value = positiveClipping.length > 0 ? positiveClipping : null;
    }
  });
  
  document.getElementById('create-negatives').addEventListener("keypress", (e) => {
    if (e.target.value === "") return;
    if (e.key === "Enter") {
      negativeClipping.push(e.target.value);
      negativeWrapper.appendChild(createNegItem(e.target.value));
      e.target.value = "";
      sendNegativeForm.value = negativeClipping.length > 0 ? negativeClipping : null;
    }
  });
  
  document.querySelector("#create-group .submit-btn").addEventListener("click", (e) => {
    if (!positiveClipping.length && !negativeClipping.length) {
      e.preventDefault();
    }
  });  
};

const editGroupHandler = () => {
  const groupName = document.getElementById("edit-group-name");
  const positiveWrapper = document.querySelector("#edit-group .positive-wrapper");
  const negativeWrapper = document.querySelector("#edit-group .negative-wrapper");
  const sendPositiveForm = document.getElementById("edit_positives");
  const sendNegativeForm = document.getElementById("edit_negatives");

  let positiveClipping = [];
  let negativeClipping = [];

  const resetData = () => {
    positiveWrapper.innerHTML = '';
    negativeWrapper.innerHTML = '';
    positiveClipping = [];
    negativeClipping = [];
    groupName.value = "";
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

  sendPositiveForm.addEventListener("submit", e => e.preventDefault());
  sendNegativeForm.addEventListener("submit", e => e.preventDefault());
  document.querySelector("#edit-group .cancel-btn").addEventListener("click", () => resetData());
  document.querySelector("#edit-group .close").addEventListener("click", () => resetData());
  document.querySelector("#edit-group .terms-form").addEventListener("keypress", e => {
    if (e.key === "Enter") e.preventDefault();
  });
  
  document.querySelectorAll(".edit-group").forEach(element => {
    element.addEventListener("click", () => {
      const groups = JSON.parse(sessionStorage.getItem("GRUPOS"));
      const selectedGroup = groups.find(group => group.id === parseFloat(element.id.split("-")[1]));
  
      document.getElementById("edit_group_id").value = selectedGroup.id;
      groupName.value = selectedGroup.grupo;
      if (selectedGroup['positivas'][0] !== "") {
        positiveClipping = [...selectedGroup['positivas']];
      }
      if (selectedGroup['negativas'][0] !== "") {
        negativeClipping = [...selectedGroup['negativas']];
      }
      sendPositiveForm.value = positiveClipping;
      sendNegativeForm.value = negativeClipping;
      selectedGroup['positivas'].forEach(pos => {
        if (pos !== "") positiveWrapper.appendChild(createPosItem(pos));
      });
      selectedGroup['negativas'].forEach(neg => {
        if (neg !== "") negativeWrapper.appendChild(createNegItem(neg));
      });
    });
  }); 
  
  document.getElementById('edit-positives').addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      positiveClipping.push(e.target.value);
      positiveWrapper.appendChild(createPosItem(e.target.value));
      e.target.value = "";
      sendPositiveForm.value = positiveClipping.length > 0 ? positiveClipping : null;
    }
  });
  
  document.getElementById('edit-negatives').addEventListener("keypress", (e) => {
    if (e.target.value === "") return;
    if (e.key === "Enter") {
      negativeClipping.push(e.target.value);
      negativeWrapper.appendChild(createNegItem(e.target.value));
      e.target.value = "";
      sendNegativeForm.value = negativeClipping.length > 0 ? negativeClipping : null;
    }
  });
  
  document.querySelector("#edit-group .submit-btn").addEventListener("click", (e) => {
    if (!positiveClipping.length && !negativeClipping.length) {
      e.preventDefault();
    }
  });
};

UrlParamsHandler();
createGroupHandler();
editGroupHandler();
