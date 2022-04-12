import { Api } from "../api/api.js";
import { LightboxFactory } from "../factories/lightboxFactory.js";
import { MediaFactory } from "../factories/mediaFactory.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";
import { SortFactory } from "../factories/SortFactory.js";
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

    span.textContent = userPhotograph.name;
    titleForm.appendChild(span);
  }

  // rendu des médias
  async displayMedia() {
    const photographHeader = document.querySelector(".photograph-header");

    const selectedField = new SortFactory().getSortMediaDom();

    this.section.insertAdjacentElement("afterbegin", selectedField);

    this.section.classList.add("media_content");
    this.mediaContainer.classList.add("media-container");
    this.mediaContainer.id = "media-container";
    this.section.appendChild(this.mediaContainer);
    this.section.setAttribute("aria-hidden", "false");

    photographHeader.after(this.section);

    const fieldOptions = document.querySelectorAll(".form-options");
    console.log(this.getDatas());
    fieldOptions.forEach(() => {
      document.addEventListener("input", (evt) =>
        this.sortRendered(evt, this.getDatas())
      );
    });

    // instanciation des medias 1er rendu
    this.getDatas().map((data) => {
      return this.mediaContainer.appendChild(
        new MediaFactory(data).getCardMediaDom()
      );
    });
  }

  sortRendered(evt, datas) {
    evt.preventDefault();

    console.log("arrivée des datas ", datas);
    let sortedMedia;
    switch (evt.target.value) {
      case "popularite":
        sortedMedia = getDataByPop(datas);
        this.setDatas(sortedMedia);
        const cardMediaByPop = sortedMedia.map((data) => {
          return new MediaFactory(data);
        });
        this.getRenderMedia(cardMediaByPop);

        break;
      case "titre":
        console.log("titre");
        sortedMedia = getDataByTitle(datas);
        console.log("new tab titre ", sortedMedia);
        this.setDatas(sortedMedia);
        const cardMediaByTitle = sortedMedia.map((data) => {
          return new MediaFactory(data);
        });
        return this.getRenderMedia(cardMediaByTitle);

      case "date":
        console.log("date");
        sortedMedia = getDataByDate(datas);
        console.log("new tab date ", sortedMedia);
        this.setDatas(sortedMedia);
        this.photographersMedias = sortedMedia;

        const cardMediaByDate = sortedMedia.map((data) => {
          return new MediaFactory(data);
        });

        return this.getRenderMedia(cardMediaByDate);

      default:
        sortedMedia = getDataByPop(this.getDatas());
        console.log("new tab pop ", sortedMedia);
        this.setDatas(sortedMedia);
        console.log("default view");
        // on créé une nouvelle instance
        const cardMediadefault = sortedMedia.map((data) => {
          return new MediaFactory(data);
        });

        return this.getRenderMedia(cardMediadefault);
    }
  }
  /**
   * Le nouveau rendu après le tri
   * @param {array} mediaOrderedBy - tableau des données réorganisé
   */
  getRenderMedia(mediaOrderedBy) {
    this.mediaContainer.innerHTML = "";
    mediaOrderedBy.forEach((card) => {
      console.log(card);
      return this.mediaContainer.appendChild(card.getCardMediaDom());
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

    const object = getSelectedMedia(currentId, this.getDatas())[0];

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
