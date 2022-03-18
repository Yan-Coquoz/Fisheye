class App {
  constructor() {
    this.getAllPhotographers = new Api("../../data/photographers.json");
    this.photographersSection = document.querySelector(".photographer_section");
  }
  async displayPhotographers(photographers) {
    photographers.forEach((photographer) => {
      const photographerModel = new PhotographerFactory(
        photographer.id,
        photographer.name,
        photographer.portrait,
        photographer.city,
        photographer.country,
        photographer.price,
        photographer.tagline
      );
      const userCardDOM = photographerModel.getUserCardDOM();
      this.photographersSection.appendChild(userCardDOM);
    });
  }
  async init() {
    // Récupère les datas des photographes
    const { photographers } = await this.getAllPhotographers.getData();
    this.displayPhotographers(photographers);
  }
}

const app = new App();
app.init();

// async function getAllPhotographers() {
//   const photographers = await callApi();
//   return photographers.json();
// }

// async function displayPhotographers(photographers) {
//   const photographersSection = document.querySelector(".photographer_section");

//   photographers.forEach((photographer) => {
//     const photographerModel = new PhotographerFactory(
//       // Attention à l'ordre des données (ordre dans le constructeur)!
//       photographer.id,
//       photographer.name,
//       photographer.portrait,
//       photographer.city,
//       photographer.country,
//       photographer.price,
//       photographer.tagline
//     );
//     const userCardDOM = photographerModel.getUserCardDOM();
//     photographersSection.appendChild(userCardDOM);
//   });
// }

// async function init() {
//   // Récupère les datas des photographes
//   const { photographers } = await getAllPhotographers();
//   displayPhotographers(photographers);
// }

// init();
