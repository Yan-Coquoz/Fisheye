/* eslint-disable indent */
import { getAllLike } from "../utils/likes.js";
class PhotographerFactory {
  constructor(id, name, portrait, city, country, price, tagline, datas) {
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.price = price;
    this.tagline = tagline;
    this.datas = datas;
  }
  // page d'accueil, carte des photographes
  getUserCardDOM() {
    const baseUrl = "../../public/photographer.html";
    const article = document.createElement("article");
    article.classList.add("article");
    const cardPhotographer = `
    <a href="${baseUrl}?id=${this.id}" aria-label="voir le travail du photographe ${this.name}">
      <div class="face-box">
        <div class="box_img">
          <img src="../../public/assets/photographers/${this.portrait}" alt="photographe ${this.name}">
        </div>
        <h2 role="heading">${this.name}</h2>
      </div>
    </a>
    <div class="box_desc">
      <h3 class="box_desc__localite" ">${this.city}, ${this.country}</h3>
      <p class="box_desc__desc">${this.tagline}</p>
      <p class="box_desc__price">${this.price}€/jour</p>
    </div>
    `;
    article.innerHTML = cardPhotographer;

    return article;
  }
  // Page d'un photographe
  getPhotographerDOM() {
    const headerBlock = document.createElement("section");
    headerBlock.classList.add("header__block");
    const likes = getAllLike(this.datas);
    headerBlock.innerHTML = `
    <div class="header__block-left">  
      <h1 class="header__block-name" tabindex="0" aria-label="Photographe ${this.name}">${this.name}</h1>
      <h2 class="city" tabindex="0" aria-label="localisation ${this.city},${this.country}">
     ${this.city}, ${this.country}</h2>
      <p class="tagline" tabindex="0" aria-label="Devise : ${this.tagline}"
      >${this.tagline}</p>
    </div>
    <div class="header__block-right">
      <img class="photographer" alt="" src="../../public/assets/photographers/${this.portrait}"> 
    </div> 
    <div class="like-price"  role="content-info" tabindex="0" ><span  aria-label="nombre de j'aime ${likes}">${likes} ❤</span><span  aria-label="tarification par jours ${this.price}€">${this.price}€ / jour</span></div>
    `;

    return headerBlock;
  }
}
export { PhotographerFactory };
