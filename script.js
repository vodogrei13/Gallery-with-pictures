const url = "https://api.thecatapi.com/v1/images/search?limit=10";
const root = document.getElementById("cards");
const btn = document.getElementById("btn");
const btnAdd = document.getElementById("btn_add");

function showBtnAdd() {
  btnAdd.style.display = "flex";
  btn.style.display = "none";
}
function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

const loadPictures = async () => {
  try {
    showLoader();
    let data = await fetch(url);
    let response = await data.json();
    if (response) {
      let i = 0;
      const chunkSize = 50;

      function insertImages() {
        let end = Math.min(i + chunkSize, response.length);
        do {
          let elem = `<img src=${response[i].url} class="img_item"></img>`;
          root.innerHTML += elem;
          i++;
        } while (i < end);

        if (i < response.length) {
          setTimeout(insertImages, 0);
        }
      }

      insertImages();
    }
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  } finally {
    hideLoader();
    showBtnAdd();
  }
};

btn.addEventListener("click", loadPictures);
btnAdd.addEventListener("click", loadPictures);
