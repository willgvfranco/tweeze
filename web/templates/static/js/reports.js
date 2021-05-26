const URL = document.URL;
const groupSelected = document.getElementById("group");
const dateSelected = document.getElementById("date-period");
const mostQuotedCheck = document.getElementById("most-quoted");
const latestNewsCheck = document.getElementById("latest-news");
const localNewsCheck = document.getElementById("local-news");
const userSentimentCheck = document.getElementById("user-sentiment");
const selectAllCheck = document.getElementById("select-all");
const applyChanges = document.getElementById("apply-changes");

const selectAllNews = document.querySelector(".select-all-news");
const newsCheckArray = document.querySelectorAll(".news-check");
const rowsArray = document.querySelectorAll(".table tbody tr");

const reportForm = document.querySelector(".generate-report-form");
const selectedNewsInput = document.getElementById("selected_news_array");
const sendReport = document.querySelector(".generate");

let newsSelected = [];

selectAllNews.addEventListener("click", (e) => {
  newsCheckArray.forEach(element => element.checked = e.target.checked);
  newsSelected = [];
  if (e.target.checked) {
    newsCheckArray.forEach(element => newsSelected.push(element.id));
    rowsArray.forEach(row => row.classList.add("row-selected"));
  } else {
    rowsArray.forEach(row => row.classList.remove("row-selected"));
  }
});

newsCheckArray.forEach(checkElement => {
  checkElement.addEventListener("click", (e) => {
    selectAllNews.checked = false;

    if (e.target.checked) {
      if (newsSelected.find(el => el === checkElement.id)) return;
      newsSelected.push(checkElement.id);
      e.target.parentNode.parentNode.classList.add("row-selected");
    } else {
      const index = newsSelected.findIndex(news => news === checkElement.id);
      index > -1 && newsSelected.splice(index, 1);
      e.target.parentNode.parentNode.classList.remove("row-selected");
    }
  });
});

reportForm.addEventListener("keypress", (e) => {
  if (e.key === "Enter") e.preventDefault();
});

sendReport.addEventListener("click", (e) => {
  e.preventDefault();
  selectedNewsInput.value = newsSelected;
  console.log('selectedNewsInput.value', selectedNewsInput.value)
  console.log('newsSelected', newsSelected);
});

const getParams = () => {
  const params = {};
  URL.split("?")[1]?.split("&")?.forEach(element => {
    params[element.split("=")[0]] = element.split("=")[1];
  });
  if (Object.keys(params).length === 0) return;
  return params;
};

const urlObj = {
  url: URL.split("?")[0],
  params: getParams() ? getParams() : {
    group_id: "",
    date: 0,
    most_quoted: false,
    latest_news: false,
    local_news: false,
    user_sentiment: false,
  },
};

for (const [key, value] of Object.entries(urlObj.params)) {
  switch (key) {
    case "group_id":
      Object.values(groupSelected.options).forEach(option => {
        if (value === option.value) option.selected = true;
      });
      break;
    case "date":
      if (!parseFloat(value)) break;
      const dateString = new Date(value*1);
      const year = dateString.getUTCFullYear();
      const month = dateString.getUTCMonth() + 1;
      const day = dateString.getUTCDate();
      dateSelected.value = `${year}-${month <= 9 ? `0${month}` : month}-${day <= 9 ? `0${day}` : day}`;
      break;
    case "most_quoted":
      mostQuotedCheck.checked = value === "true" ? true : false;
      break;
    case "latest_news":
      latestNewsCheck.checked = value === "true" ? true : false;
      break;
    case "local_news":
      localNewsCheck.checked = value === "true" ? true : false;
      break;
    case "user_sentiment":
      userSentimentCheck.checked = value === "true" ? true : false;
      break;
    default:
      break;
  }
}

const reloadWithParams = () => {
  let newUrl = `${urlObj.url}?`;

  for (const [key, value] of Object.entries(urlObj.params)) {
    newUrl = `${newUrl}${key}=${value}&`;
  }
  newUrl = newUrl.slice(0, -1);
  location.replace(newUrl);
};

groupSelected.addEventListener("change", (e) => urlObj.params.group_id = e.target.value);
dateSelected.addEventListener("change", (e) => urlObj.params.date = new Date(e.target.value).valueOf());
mostQuotedCheck.addEventListener("click", (e) => {
  urlObj.params.most_quoted = e.target.checked;
  if (selectAllCheck.checked && !e.target.checked) selectAllCheck.checked = false;
});
latestNewsCheck.addEventListener("click", (e) => {
  urlObj.params.latest_news = e.target.checked;
  if (selectAllCheck.checked && !e.target.checked) selectAllCheck.checked = false;
});
localNewsCheck.addEventListener("click", (e) => {
  urlObj.params.local_news = e.target.checked;
  if (selectAllCheck.checked && !e.target.checked) selectAllCheck.checked = false;
});
userSentimentCheck.addEventListener("click", (e) => {
  urlObj.params.user_sentiment = e.target.checked;
  if (selectAllCheck.checked && !e.target.checked) selectAllCheck.checked = false;
});
selectAllCheck.addEventListener("click", (e) => {
  mostQuotedCheck.checked = e.target.checked;
  latestNewsCheck.checked = e.target.checked;
  localNewsCheck.checked = e.target.checked;
  userSentimentCheck.checked = e.target.checked;
  urlObj.params.most_quoted = e.target.checked;
  urlObj.params.latest_news = e.target.checked;
  urlObj.params.local_news = e.target.checked;
  urlObj.params.user_sentiment = e.target.checked;
});
applyChanges.addEventListener("click", () => reloadWithParams());
