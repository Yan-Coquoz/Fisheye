async function getAllPhotographers() {
  const photographers = await callApi();
  return photographers.json();
}

async function displayPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  // const photographerData = document.querySelector(".photograph-header");

  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerFactory(
      // Attention à l'ordre des données (ordre dans le constructeur)!
      photographer.id,
      photographer.name,
      photographer.portrait,
      photographer.city,
      photographer.country,
      photographer.price,
      photographer.tagline
    );
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getAllPhotographers();
  displayPhotographers(photographers);
}

init();
