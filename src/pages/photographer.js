import { Api } from "../api/api.js";
import { MediaFactory } from "../factories/media.js";
import { PhotographerFactory } from "../factories/photographer.js";

class Photographer {
  constructor() {
    this.photographers = new Api("../../data/photographers.json");
    this.id = this.extractUrlParam();
    this.divMediaBlock = document.createElement("div");
    this.section = document.createElement("section");
  }

  extractUrlParam() {
    // reccuperation de l'url courante.
    const url = window.location.href;
    const regex = /([^&=]+)=?([^&]*)/g;
    // retourne les parametres de l'url sous forme de tableaux
    const getId = regex.exec(url);
    return Number(getId[2]);
  }

  async displayPhotographer(user) {
    const photographHeader = document.querySelector(".photograph-header");
    const photographer = new PhotographerFactory(
      user.id,
      user.name,
      user.portrait,
      user.city,
      user.country,
      user.price,
      user.tagline
    );
    const cardPhotographer = photographer.getPhotographerDOM();
    photographHeader.appendChild(cardPhotographer);
  }

  async displayMedia(datas) {
    let formulaire, cardMedia;
    const photographHeader = document.querySelector(".photograph-header");
    this.section.classList.add("media_content");
    this.divMediaBlock.classList.add("media-container");
    this.divMediaBlock.id = "media-container";
    this.section.appendChild(this.divMediaBlock);

    photographHeader.after(this.section);
    // instanciation des medias
    cardMedia = datas.map((data) => {
      const values = new MediaFactory(data);
      formulaire = new MediaFactory(data);
      return values.getCardMediaDom();
    });
    const formaData = formulaire.getFormMediaDom();

    // je recupere le select du form
    const elementTri = formaData.querySelector(".form-select");

    // je capte la valeur de retour du formulaire

    elementTri.addEventListener("input", (evt) => {
      // TODO switch
      const value = evt.target.value;
      if (value === "popularite") {
        // retourne un tableau trier par popularité
        cardMedia = this.getDataByPop(datas);
        // on créé une nouvelle instance
        const cardMediaByPop = cardMedia.map((data) => {
          return new MediaFactory(data);
        });
        return this.getRenderMedia(cardMediaByPop);
      } else if (value === "date") {
        cardMedia = this.getDataByDate(datas);
        const cardMediaByDate = cardMedia.map((data) => {
          return new MediaFactory(data);
        });
        return this.getRenderMedia(cardMediaByDate);
      } else if (value === "titre") {
        cardMedia = this.getDataByTitle(datas);

        const cardMediaByTitle = cardMedia.map((data) => {
          return new MediaFactory(data);
        });
        return this.getRenderMedia(cardMediaByTitle);
      }
    });

    // rendu des medias
    cardMedia.forEach((card) => {
      return this.divMediaBlock.appendChild(card);
    });

    // ajoute un noeud à une position précise
    return this.section.insertAdjacentElement("afterbegin", formaData);
  }
  displayLightbox(data) {
    console.log(localStorage.getItem("id"));
  }
  // nouveau rendu après le tri
  getRenderMedia(mediaOrderedBy) {
    this.divMediaBlock.innerHTML = "";
    return mediaOrderedBy.forEach((card) => {
      return this.divMediaBlock.appendChild(card.getCardMediaDom());
    });
  }

  getDataByPop(datas) {
    return datas.sort((a, b) => {
      // 'b'(par sa position) sera la reference et sera comparé à 'a', qui sera l'élément suivant
      // b > a
      return b.likes - a.likes;
    });
  }

  getDataByTitle(datas) {
    return datas.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

  getDataByDate(datas) {
    const date = datas.slice().sort((a, b) => {
      // a < b
      const valueA = new Date(a.date);
      const valueB = new Date(b.date);
      return valueB - valueA;
    });
    return date;
  }
  // toutes les likes d'un photographe
  getAllLike(datas) {
    let initValue = 0;
    const likes = datas.reduce((previous, current) => {
      return previous + current.likes;
    }, initValue);
    localStorage.setItem("likes", likes);
  }

  // réccup les medias d'1 photographe
  getDatasByPhotographId(id, medias) {
    const datas = medias.filter((media) => {
      return media.photographerId === id;
    });
    return datas;
  }
  // réccup 1 photographe
  getPhotographer(id, users) {
    const datas = users.filter((user) => {
      return user.id === id;
    });
    return datas[0];
  }

  async rendu() {
    // reccup les donnée de l'api
    const { photographers, media } = await this.photographers.getData();
    const datas = await this.getDatasByPhotographId(this.id, media);
    const photographer = await this.getPhotographer(this.id, photographers);
    this.getAllLike(datas);
    this.displayLightbox(datas);
    this.displayPhotographer(photographer);
    this.displayMedia(datas);
  }
}
const user = new Photographer();
user.rendu();
