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

  // rendu des filtres
  displaySortFilter() {
    this.section.classList.add("media_content");
    const selectedField = new SortFactory().getSortMediaDom();
    this.section.insertAdjacentElement("afterbegin", selectedField);
  }

  // rendu des médias
  async displayMedia() {
    const photographHeader = document.querySelector(".photograph-header");

    this.mediaContainer.classList.add("media-container");
    this.mediaContainer.id = "media-container";
    this.section.appendChild(this.mediaContainer);
    this.section.setAttribute("aria-hidden", "false");

    photographHeader.after(this.section);

    const fieldOptions = document.querySelectorAll(".form-options");
    console.log(this.getDatas());
    fieldOptions.forEach(() => {
      document.addEventListener("input", this.sortRendered.bind(this));
    });

    // instanciation des medias 1er rendu
    this.getDatas().forEach((data) => {
      // console.log("data --=>", data);
      return this.mediaContainer.appendChild(
        new MediaFactory(data).getCardMediaDom()
      );
    });
  }

  /**
   * Le nouveau rendu des médias après le tri
   * @param {array} mediaOrderedBy - tableau des données réorganisé
   */
  getNewRenderedMedia(mediaOrderedBy) {
    document.querySelectorAll(".media-box").forEach((elt) => {
      elt.remove();
    });

    const render = mediaOrderedBy.map((card) => {
      console.log("chaque articles ", card);
      return this.mediaContainer.appendChild(
        new MediaFactory(card).getCardMediaDom()
      );
    });
    console.log("getNewRenderedMedia =>", render);
    return render;
  }

  /**
   * @param {keyboardEvent} evt
   * @param {array} datas
   * @returns
   */
  sortRendered(evt) {
    evt.preventDefault();

    console.log("arrivée des datas ", this.getDatas());

    switch (evt.target.value) {
      case "popularite":
        console.log("pop");
        const sortedMediaByPop = getDataByPop(this.getDatas());
        this.setDatas(sortedMediaByPop);
        this.getNewRenderedMedia(sortedMediaByPop);

        break;
      case "titre":
        const sortedMediaByTitle = getDataByTitle(this.getDatas());
        console.log("new tab titre ", sortedMediaByTitle);
        this.setDatas(sortedMediaByTitle);
        this.getNewRenderedMedia(sortedMediaByTitle);
        break;
      case "date":
        const sortedMediaByDate = getDataByDate(this.getDatas());
        console.log("new tab date ", sortedMediaByDate);
        this.setDatas(sortedMediaByDate);

        this.getNewRenderedMedia(sortedMediaByDate);
        break;

      default:
        const sortedMediaByDefault = getDataByPop(this.getDatas());
        console.log("new tab pop ", sortedMediaByDefault);
        this.setDatas(sortedMediaByDefault);
        console.log("default view");
        return this.getNewRenderedMedia(cardMediadefault);
    }
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
    this.displaySortFilter();
    this.displayMedia();
    this.displayLightbox();
  }
}
const user = new Photographer();
user.rendu();
