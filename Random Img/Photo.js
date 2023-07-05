var dataEl = document.getElementById("forms");
const searchIdEl = document.getElementById("search__id");
const searchResultsEl = document.getElementById("search__results");
const searchresult = document.getElementById("search__result");

let inputData = " ";
let page = 1;

const API_KEY = "zN2Df4KRnEoASAKrbqw1uM1ObFs38MeLnutVo747cgY";

async function searchPhoto() {
  inputData = searchIdEl.value;
  console.log(inputData);
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data);
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }
  let results = data.results;
  results.map((res) => {
    const createImgWapper = document.createElement("div");
    createImgWapper.classList.add("search__result");
    const createImage = document.createElement("img");
    createImage.src = res.urls.small;
    createImage.alt = res.alt_description;
    const ImageLink = document.createElement("a");
    ImageLink.href = res.links.html;
    ImageLink.target = "_blank";
    ImageLink.textContent = res.alt_description;
    createImgWapper.appendChild(createImage);
    createImgWapper.appendChild(ImageLink);
    searchResultsEl.appendChild(createImgWapper);
  });
  page++;

  if (page > 1) {
    document.getElementById("btns").style.display = "block";
  }
}

function showMoreBtn() {
  page++;

}

dataEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchPhoto();
});
const btnI = document.getElementById("btns");
btnI.addEventListener("click", (e) => {
  showMoreBtn();
  searchPhoto();
});
