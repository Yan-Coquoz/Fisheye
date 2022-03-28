import { Api } from "../api/api.js";
import { MediaFactory } from "../factories/media.js";
import { PhotographerFactory } from "../factories/photographer.js";
import {
  getDataByPop,
  getDataByTitle,
  getDataByDate,
  getPhotographer,
  getDatasByPhotographId,
} from "../utils/filtres.js";

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

  async displayPhotographer(user, datas) {
    const photographHeader = document.querySelector(".photograph-header");
    const photographer = new PhotographerFactory(
      user.id,
      user.name,
      user.portrait,
      user.city,
      user.country,
      user.price,
      user.tagline,
      datas
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
    this.section.setAttribute("aria-hidden", "false");

    photographHeader.after(this.section);
    // instanciation des medias
    cardMedia = datas.map((data) => {
      const values = new MediaFactory(data);
      formulaire = new MediaFactory(data);
      return values.getCardMediaDom();
    });
    const formaData = formulaire.getSortMediaDom();

    // je recupere le select du form
    const elementTri = formaData.querySelector(".form-select");

    // je capte la valeur de retour du formulaire
    elementTri.addEventListener("input", (evt) => {
      switch (evt.target.value) {
        case "popularite":
          cardMedia = getDataByPop(datas);
          // on créé une nouvelle instance
          const cardMediaByPop = cardMedia.map((data) => {
            return new MediaFactory(data);
          });
          return this.getRenderMedia(cardMediaByPop);
        case "date":
          cardMedia = getDataByDate(datas);
          const cardMediaByDate = cardMedia.map((data) => {
            return new MediaFactory(data);
          });
          return this.getRenderMedia(cardMediaByDate);
        case "titre":
          cardMedia = getDataByTitle(datas);

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

  // rendu de la lightbox
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

  async rendu() {
    // reccup les donnée de l'api
    const { photographers, media } = await this.photographers.getData();
    const datas = await getDatasByPhotographId(this.id, media);
    const photographer = await getPhotographer(this.id, photographers);

    this.displayLightbox(datas);
    this.displayPhotographer(photographer, datas);
    this.displayMedia(datas);
  }
}
const user = new Photographer();
user.rendu();
