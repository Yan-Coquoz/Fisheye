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
    this.mediaContainer = document.createElement("div");
    this.section = document.createElement("section");
    this.photographersMedias = this.getDatas();
  }
  /**
   *
   * @returns {ArrayOfObject}
   */
  getDatas() {
    return this.photographersMedias;
  }
  /**
   * setter
   * @param {ArrayOfObject} datas
   */
  setDatas(datas) {
    this.photographersMedias = datas;
  }
  /**
   * reccuperation de l'url courante.
   * @returns {number} l'id du photographe
   */
  extractUrlParam() {
    const url = window.location.href;
    const regex = /([^&=]+)=?([^&]*)/g;
    // retourne les parametres de l'url sous forme de tableaux
    const getId = regex.exec(url);
    return Number(getId[2]);
  }

  /**
   * rendu du photographe
   * @param {array} userPhotograph les données d'un photographe
   * @param {array} datas les médias du photographe
   */
  async displayPhotographer(userPhotograph, datas) {
    const photographHeader = document.querySelector(".photograph-header");

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

    photographHeader.appendChild(photographer.getPhotographerDOM());
    // mise en place du nom dans la modale de usefiltres
    const titleForm = document.querySelector(".contact_modal-title");
    const span = document.createElement("span");
    span.style.display = "block";
    span.textContent = user.name;
    titleForm.appendChild(span);
  }

  // rendu des médias
  async displayMedia() {
    let renderSortDom, cardMedia;
    const photographHeader = document.querySelector(".photograph-header");
    this.section.classList.add("media_content");
    this.mediaContainer.classList.add("media-container");
    this.mediaContainer.id = "media-container";
    this.section.appendChild(this.mediaContainer);
    this.section.setAttribute("aria-hidden", "false");

    photographHeader.after(this.section);

    // instanciation des medias
    cardMedia = this.getDatas().map((data) => {
      const values = new MediaFactory(data);
      renderSortDom = new MediaFactory(data).getSortMediaDom();
      return values.getCardMediaDom();
    });

    // 1er rendu des médias
    cardMedia.forEach((card) => {
      return this.mediaContainer.appendChild(card);
    });

    // tri des médias
    renderSortDom
      .querySelector(".form-select")
      .addEventListener("input", (evt) => {
        // je capte la valeur de retour du usefiltres
        switch (evt.target.value) {
          case "popularite":
            cardMedia = getDataByPop(this.getDatas());
            console.log("new tab pop ", cardMedia);
            this.setDatas(cardMedia);
            // on créé une nouvelle instance
            const cardMediaByPop = cardMedia.map((data) => {
              return new MediaFactory(data);
            });

            return this.getRenderMedia(cardMediaByPop);

          case "date":
            cardMedia = getDataByDate(this.getDatas());
            console.log("new tab date ", cardMedia);
            this.setDatas(cardMedia);
            const cardMediaByDate = cardMedia.map((data) => {
              return new MediaFactory(data);
            });

            return this.getRenderMedia(cardMediaByDate);

          case "titre":
            cardMedia = getDataByTitle(this.getDatas());
            console.log("new tab titre ", cardMedia);
            this.setDatas(cardMedia);
            const cardMediaByTitle = cardMedia.map((data) => {
              return new MediaFactory(data);
            });
            return this.getRenderMedia(cardMediaByTitle);
        }
      });
    // rendu des médias au Dom avec le filtre de tri
    this.section.insertAdjacentElement("afterbegin", renderSortDom);
  }

  /**
   * Le nouveau rendu après le tri
   * @param {array} mediaOrderedBy - tableau des données réorganisé
   * @returns {HTMLElement}
   */
  getRenderMedia(mediaOrderedBy) {
    this.mediaContainer.innerHTML = "";
    return mediaOrderedBy.forEach((card) => {
      this.mediaContainer.appendChild(card.getCardMediaDom());
    });
  }

  /**
   *  rendu de la lightbox
   * @returns HTMLElement
   */
  async displayLightbox() {
    const lightbox = document.querySelector("#lightbox");
    const divDom = document.createElement("div");
    divDom.classList.add("lightbox_bloc");

    // creation de la LB au click
    const selectedArticle = document.querySelectorAll("article");
    selectedArticle.forEach((elt) => {
      elt.addEventListener("click", (evt) => this.loadLightbox(evt, divDom));
    });

    selectedArticle.forEach((elt) => {
      elt.addEventListener("keyup", (evt) => {
        this.loadLightbox(evt, divDom);
      });
    });

    document.querySelector("button.lightbox-btn.close");
    return lightbox.appendChild(divDom);
  }

  loadLightbox(evt, eltHTML) {
    const currentId = Number(evt.target.id);
    console.log(currentId);
    const object = getSelectedMedia(currentId, this.getDatas())[0];
    console.log("objet", object);
    // supprime l'élément précédent si il y a.
    eltHTML.innerHTML = "";
    if (evt.key === "Enter" || evt.type === "click") {
      eltHTML.appendChild(
        new LightboxFactory(currentId, object, this.getDatas()).getLightboxDOM()
      );
    } else {
      console.warn("pas de valeurs d'entrée");
    }
  }

  async rendu() {
    // reccup les donnée de l'api
    const { photographers, media } = await this.photographers.getData();
    const datas = await getDatasByPhotographId(this.id, media);
    const photographer = await getPhotographer(this.id, photographers);

    this.setDatas(datas);

    this.displayPhotographer(photographer, this.getDatas());

    this.displayMedia();
    this.displayLightbox();
  }
}
const user = new Photographer();
user.rendu();
