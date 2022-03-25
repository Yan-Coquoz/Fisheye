/* eslint-disable indent */
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

  getPhotographerDOM() {
    const headerBlock = document.createElement("section");
    headerBlock.classList.add("header__block");
    headerBlock.innerHTML = `
    <div class="header__block-left">  
      <h1 class="header__block-name" >${this.name}</h1>
      <h2 class="city">${this.city}, ${this.country}</h2>
      <p class="tagline">${this.tagline}</p>
    </div>
    <div class="header__block-right">
      <img class="photographer" alt="" src="../../public/assets/photographers/${
        this.portrait
      }"> 
    </div> 
    <div class="like-price"><span>${localStorage.getItem(
      "likes"
    )} ❤</span><span>${this.price}€ / jour</span></div>
    `;

    return headerBlock;
  }
}
export { PhotographerFactory };
