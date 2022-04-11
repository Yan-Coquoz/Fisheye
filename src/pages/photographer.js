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
    this.photographersMedias = this.getDatas();
  }
  // Getter & Setter
  getDatas() {
    return this.photographersMedias;
  }
  setDatas(datas) {
    this.photographersMedias = datas;
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
  async displayPhotographer(userPhotograph, datas) {
    const photographHeader = document.querySelector(".photograph-header");
    console.log("Display photo ", datas);
    const photographer = new PhotographerFactory(
      userPhotograph.id,
      userPhotograph.name,
      userPhotograph.portrait,
      userPhotograph.city,
      userPhotograph.country,
      userPhotograph.price,
      userPhotograph.tagline,
      datas
    );
    const cardPhotographer = photographer.getPhotographerDOM();
    photographHeader.appendChild(cardPhotographer);
    // mise en place du nom dans la modale de usefiltres
    const titleForm = document.querySelector(".contact_modal-title");
    const span = document.createElement("span");
    span.style.display = "block";
    span.textContent = user.name;
    titleForm.appendChild(span);
  }
  // rendu des médias
  async displayMedia() {
    console.log("display Medias ");
    let usefiltres, cardMedia;
    const photographHeader = document.querySelector(".photograph-header");
    this.section.classList.add("media_content");
    this.divMediaBlock.classList.add("media-container");
    this.divMediaBlock.id = "media-container";
    this.section.appendChild(this.divMediaBlock);
    this.section.setAttribute("aria-hidden", "false");

    photographHeader.after(this.section);

    // instanciation des medias
    cardMedia = this.getDatas().map((data) => {
      const values = new MediaFactory(data);
      usefiltres = new MediaFactory(data);
      return values.getCardMediaDom();
    });
    console.log("cardMedia ", cardMedia);
    // 1er rendu des médias
    cardMedia.forEach((card) => {
      return this.divMediaBlock.appendChild(card);
    });

    // usefiltres de tri
    const filtredDatas = usefiltres.getSortMediaDom();
    // je recupere le select du form

    filtredDatas
      .querySelector(".form-select")
      .addEventListener("input", (evt) => {
        // je capte la valeur de retour du usefiltres
        switch (evt.target.value) {
          case "popularite":
            cardMedia = getDataByPop(this.getDatas());
            console.log("pop ", cardMedia);
            // on créé une nouvelle instance
            const cardMediaByPop = cardMedia.map((data) => {
              return new MediaFactory(data);
            });
            return this.getRenderMedia(cardMediaByPop);

          case "date":
            cardMedia = getDataByDate(this.getDatas());
            console.log("date ", cardMedia);
            const cardMediaByDate = cardMedia.map((data) => {
              return new MediaFactory(data);
            });
            return this.getRenderMedia(cardMediaByDate);

          case "titre":
            cardMedia = getDataByTitle(this.getDatas());
            console.log("titre ", cardMedia);
            this.setDatas(cardMedia);
            const cardMediaByTitle = cardMedia.map((data) => {
              return new MediaFactory(data);
            });
            return this.getRenderMedia(cardMediaByTitle);
        }
      });
    this.section.insertAdjacentElement("afterbegin", filtredDatas);
  }

  /**
   * Le nouveau rendu après le tri
   * @param {array} mediaOrderedBy - tableau des données réorganisé
   * @returns HTMLElement
   */
  getRenderMedia(mediaOrderedBy) {
    this.divMediaBlock.innerHTML = "";
    return mediaOrderedBy.forEach((card) => {
      return this.divMediaBlock.appendChild(card.getCardMediaDom());
    });
  }

  /**
   *  rendu de la lightbox
   * @param {array} datas - toutes les datas
   * @returns HTMLElement
   */
  async displayLightbox(datas) {
    const lightbox = document.querySelector("#lightbox");

    const divDom = document.createElement("div");
    divDom.classList.add("lightbox_bloc");

    const selectedArticle = document.querySelectorAll("article");
    selectedArticle.forEach((elt) => {
      elt.addEventListener("click", (evt) => {
        const currentId = Number(evt.target.id);
        const object = getSelectedMedia(currentId, datas)[0];
        // supprime l'élément précédent si il y a.
        divDom.innerHTML = "";

        // try {
        divDom.appendChild(
          new LightboxFactory(
            currentId,
            object,
            this.getDatas()
          ).getLightboxDOM()
        );
      });
    });
    document.querySelector("button.lightbox-btn.close");
    return lightbox.appendChild(divDom);
  }

  async rendu() {
    // reccup les donnée de l'api
    const { photographers, media } = await this.photographers.getData();
    const datas = await getDatasByPhotographId(this.id, media);
    const photographer = await getPhotographer(this.id, photographers);

    this.setDatas(datas);

    this.displayPhotographer(photographer, this.getDatas());
    this.displayMedia();
    this.displayLightbox(this.getDatas());
  }
}
const user = new Photographer();
user.rendu();
