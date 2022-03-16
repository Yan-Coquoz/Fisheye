async function getPhotographers() {
  const photographers = await callApi();
  return photographers.json();
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers();
  // console.log("les photographes ", photographers);
  // console.log("les medias ", media);
  displayData(photographers, media);
}

init();
