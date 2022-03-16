async function getPhotographers() {
  const photographers = await callApi();
  return photographers.json();
}

async function displayData(photographers, media) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);

    displayPhotographer();
  });
}
async function displayPhotographer(photographerDatas) {
  const photographerDatas = document.querySelector(".photograph-header");
  const formulaire = document.querySelector("form");
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers();
  // console.log("les photographes ", photographers);
  // console.log("les medias ", media);
  displayData(photographers, media);
}

init();
