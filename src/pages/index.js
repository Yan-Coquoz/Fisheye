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
    displayPhotographer(
      photographerModel,
      media.filter((medias) => {
        return medias.photographerId === photographerModel.id;
      })
    );
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers();

  displayData(photographers, media);
}

init();
