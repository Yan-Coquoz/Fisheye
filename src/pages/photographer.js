import { Api } from "../api/api.js";
import { LightboxFactory } from "../factories/lightboxFactory.js";
import { MediaFactory } from "../factories/mediaFactory.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";
import {
  getDataByPop,
  getDataByTitle,
  getDataByDate,
  getPhotographer,
  getDatasByPhotographId,
  getSelectedMedia,
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
  // rendu du photographe
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
  // rendu des médias
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
    // formulaire de tri
    const formaData = formulaire.getSortMediaDom();
    // je recupere le select du form
    formaData.querySelector(".form-select").addEventListener("input", (evt) => {
      // je capte la valeur de retour du formulaire
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

    cardMedia.forEach((card) => {
      return this.divMediaBlock.appendChild(card);
    });

    return this.section.insertAdjacentElement("afterbegin", formaData);
  }

  // rendu de la lightbox
  async displayLightbox(datas) {
    const lightbox = document.querySelector("#lightbox");
    const mediaItem = document.querySelectorAll(".media-item");
    mediaItem.forEach((elt) => {
      elt.addEventListener("click", (evt) => {
        const currentId = evt.currentTarget.getAttribute("id");
        const medias = getSelectedMedia(+currentId, datas);

        // try {
        const currentMedia = new LightboxFactory(currentId, medias[0], datas);

        currentMedia.lbox
          .querySelector(".left")
          .addEventListener("click", () => {
            currentMedia.lbox.innerHTML = "";
            const prevM = currentMedia.prevMedia();
            console.log(prevM);
            new LightboxFactory(prevM.id, prevM, datas);
            return currentMedia.lbox;
          });
        currentMedia.lbox
          .querySelector(".right")
          .addEventListener("click", () => {
            currentMedia.lbox.innerHTML = "";
            const nextM = currentMedia.nextMedia();
            new LightboxFactory(nextM.id, nextM, datas);
          });
      });
    });

    lightbox.insertAdjacentHTML("afterbegin", mediaItem);
  }

  // nouveau rendu après le tri
  /**
   * @param {array} mediaOrderedBy tableau des données réorganisé
   * @returns HTMLElement
   */
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

    this.displayPhotographer(photographer, datas);
    this.displayMedia(datas);
    this.displayLightbox(datas);
  }
}
const user = new Photographer();
user.rendu();
