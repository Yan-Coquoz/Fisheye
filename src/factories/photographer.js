class PhotographerFactory {
  constructor(id, name, portrait, city, country, price, tagline) {
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.price = price;
    this.tagline = tagline;
    this.data = [];
  }
  getUserCardDOM() {
    // création des composants
    const article = document.createElement("article");
    const anchor = document.createElement("a");
    const faceBox = document.createElement("div");
    const imgBox = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const boxDesc = document.createElement("div");
    const localisation = document.createElement("h3");
    const desc = document.createElement("p");
    const seePrice = document.createElement("p");
    // les classes
    faceBox.classList.add("face-box");
    imgBox.classList.add("box_img");
    desc.classList.add("box_desc__desc");
    seePrice.classList.add("box_desc__price");
    boxDesc.classList.add("box_desc");
    localisation.classList.add("box_desc__localite");
    // attributs
    anchor.setAttribute("href", `../../photographer.html`);
    img.setAttribute(
      "src",
      `../../public/assets/photographers/${this.portrait}`,
    );
    img.setAttribute("alt", `photographe ${this.name}`);
    // le contenu du visuel
    h2.textContent = this.name;
    localisation.textContent = `${this.city}, ${this.country}`;
    desc.textContent = this.tagline;
    seePrice.textContent = `${this.price}€/jour`;
    // injection dans le DOM
    article.appendChild(anchor);
    anchor.appendChild(faceBox);
    faceBox.appendChild(imgBox);
    imgBox.appendChild(img);
    faceBox.appendChild(h2);
    boxDesc.appendChild(localisation);
    boxDesc.appendChild(desc);
    boxDesc.appendChild(seePrice);
    article.appendChild(boxDesc);

    return article;
  }
  setData(data) {
    return (this.data = data);
  }
}
