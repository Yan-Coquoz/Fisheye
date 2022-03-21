
import { Api } from "../api/api.js";
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
    //retourne les parametres de l'url sous forme de tableau
    const getId = regex.exec(url);
    return Number(getId[2]);
  }

  async displayPhotographerAndDatas(user, work) {
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
    return datas[0];
  }

  async rendu() {
    const { photographers, media } = await this.photographers.getData();
    const datas = await this.getDatasByPhotographId(this.id, media);
    const photographer = await this.getPhotographer(this.id, photographers);
    this.displayPhotographerAndDatas(photographer, datas);
    console.log("-- --", photographer, datas);
  }
}
const user = new Photographer();
user.rendu();

