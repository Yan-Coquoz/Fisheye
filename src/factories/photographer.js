class photographerFactory {
  id;
  name;
  portrait;
  city;
  country;
  price;
  tagline;
  constructor(city, country, id, price, name, portrait, tagline) {
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.price = price;
    this.tagline = tagline;
  }
  getUserCardDOM() {
    console.log("je cree un user");
  }
}
// function photographerFactory(data) {
//   const { city, country, id, price, name, portrait, tagline } = data;
//   const picture = `./assets/photographers/${portrait}`;

//   function getUserCardDOM() {
//     // création des composants
//     const article = document.createElement("article");
//     const anchor = document.createElement("a");
//     const faceBox = document.createElement("div");
//     const imgBox = document.createElement("div");
//     const img = document.createElement("img");
//     const h2 = document.createElement("h2");
//     const boxDesc = document.createElement("div");
//     const localisation = document.createElement("h3");
//     const desc = document.createElement("p");
//     const seePrice = document.createElement("p");
//     // les classes
//     faceBox.classList.add("face-box");
//     imgBox.classList.add("box_img");
//     desc.classList.add("box_desc__desc");
//     seePrice.classList.add("box_desc__price");
//     boxDesc.classList.add("box_desc");
//     localisation.classList.add("box_desc__localite");
//     // attributs
//     anchor.setAttribute("href", `../../photographer.html`);
//     img.setAttribute("src", picture);
//     img.setAttribute("alt", `photographe ${name}`);
//     // le contenu du visuel
//     h2.textContent = name;
//     localisation.textContent = `${city}, ${country}`;
//     desc.textContent = tagline;
//     seePrice.textContent = `${price}€/jour`;
//     // injection dans le DOM
//     article.appendChild(anchor);
//     anchor.appendChild(faceBox);
//     faceBox.appendChild(imgBox);
//     imgBox.appendChild(img);
//     faceBox.appendChild(h2);
//     boxDesc.appendChild(localisation);
//     boxDesc.appendChild(desc);
//     boxDesc.appendChild(seePrice);
//     article.appendChild(boxDesc);

//     return article;
//   }

//   return { name, picture, id, getUserCardDOM };
// }
