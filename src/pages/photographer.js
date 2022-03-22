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
    const photographHeader = document.querySelector(".photograph-header");
    console.log(datas);

    const cardMedia = datas.map((data) => {
      const values = new MediaFactory(data);

      return values.getMediaDom();
    });
    cardMedia.forEach((card) => {
      return photographHeader.after(card);
    });
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
