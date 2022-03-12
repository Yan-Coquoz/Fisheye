async function getPhotographers() {
  const photographers = await callApi();
  return photographers.json();
}

async function displayData(photographers, media) {
  const photographersSection = document.querySelector(".photographer_section");
  const photographerData = document.querySelector(".photograph-header");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    // recuperer l'id du photographe
    // faire une recherche des medias (concordance id photographe)
  });
  const photographeDetails = media.filter((id) => {});

  detailPhotographer();
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers();
  console.log("les photographes ", photographers);
  console.log("les medias ", media);
  displayData(photographers, media);
}

init();
