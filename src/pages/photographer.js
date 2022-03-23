import { Api } from "../api/api.js";
import { MediaFactory } from "../factories/media.js";
import { PhotographerFactory } from "../factories/photographer.js";

class Photographer {
  constructor() {
    this.photographers = new Api("../../data/photographers.json");
    this.id = this.extractUrlParam();
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
    // TODO injecter les données selon le tri du formulaire
    const photographHeader = document.querySelector(".photograph-header");
    const section = document.createElement("section");
    section.classList.add("media_content");
    photographHeader.after(section);
    let formulaire;
    // instanciation des medias
    const cardMedia = datas.map((data) => {
      const values = new MediaFactory(data);
      formulaire = new MediaFactory(data);

      return values.getCardMediaDom();
    });
    const formaData = formulaire.getFormMediaDom();

    // je recupere le select du form
    const elementTri = formaData.querySelector(".form-select");

    // je capte la valeur de retour du formulaire
    elementTri.addEventListener("input", (evt) => {
      const value = evt.target.value;
      if (value === "popularite") {
        this.getDataByPop(datas);
      } else if (value === "date") {
        this.getDataByDate(datas);
      } else if (value === "titre") {
        this.getDataByTitle(datas);
      } else {
        throw "OOPS !";
      }
    });
    // rendu des medias
    cardMedia.forEach((card) => {
      return section.appendChild(card);
    });

    // ajoute un noeud à une position précise
    return section.insertAdjacentElement("afterbegin", formaData);
  }

  getDataByPop(datas) {
    const likes = datas.map((e, p) => {
      if (e.likes > datas[p + 1].likes) {
        console.log(e);
        return e;
      }
    });

    console.log(likes);
  }

  getDataByTitle(datas) {
    console.log(datas);
  }

  getDataByDate(datas) {
    console.log(datas);
  }

  getDatasByPhotographId(id, medias) {
    const datas = medias.filter((media) => {
      return media.photographerId === id;
    });
    return datas;
  }

  getPhotographer(id, users) {
    const datas = users.filter((user) => {
      return user.id === id;
    });
    // console.log(datas);
    return datas[0];
  }

  async rendu() {
    const { photographers, media } = await this.photographers.getData();
    const datas = await this.getDatasByPhotographId(this.id, media);
    const photographer = await this.getPhotographer(this.id, photographers);
    this.displayPhotographer(photographer);
    this.displayMedia(datas);
  }
}
const user = new Photographer();
user.rendu();
