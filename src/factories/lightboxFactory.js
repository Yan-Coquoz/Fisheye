import { TypeMediaFactory } from "./TypeMediaFactory.js";
import { getIndexCurrentMedia } from "../utils/filtres.js";

class LightboxFactory {
  /**
   * @param {number} id - l'identifiant du media ouvert
   * @param {objet} media - toutes les propriétés du media courant
   * @param {array} datas - tous les medias d'un photographe selon le tri
   * @retrun HTMLElement
   */
  constructor(id, media, datas) {
    this.currentId = +id;
    this.currentMedia = media;
    this.datas = datas;
    this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
    // injecte le HTML à la création de la LB
    this.lbox = this.getLightboxDOM();
    document.body.appendChild(this.lbox);
  }

  /**
   * @param {object} media - le media selectioné
   * @returns
   */
  setCurrentMedia(media) {
    console.log(media);
    return (this.currentMedia = media);
  }
  getCurrentMedia() {
    return this.currentMedia;
  }

  // passage au média suivant
  nextMedia() {
    const currentMediaId = getIndexCurrentMedia(this.currentId, this.datas);
    if (this.datas.length - 1 === currentMediaId) {
      return this.setCurrentMedia(this.datas[0]);
    } else {
      return this.setCurrentMedia(this.datas[currentMediaId + 1]);
    }
  }

  // passage au média précédent
  prevMedia() {
    const currentMediaId = getIndexCurrentMedia(this.currentId, this.datas);
    if (currentMediaId === 0) {
      const i = this.datas.length - 1;
      return this.setCurrentMedia(this.datas[i]);
    } else {
      return this.setCurrentMedia(this.datas[currentMediaId - 1]);
    }
  }

  /**
   * @returns HTMLElement
   */
  getLightboxDOM() {
    const lbContainer = document.querySelector("#lightbox");
    const div = document.createElement("div");

    div.innerHTML = `<button class="lightbox-btn close" onclick="closeLBModal()" aria-label="Bouton de fermeture"><i class="fa fa-times"></i></button>
        <button class="lightbox-btn right" aria-label="media suivant"><i class="fa fa-angle-right"></i>
        </button>
        <button class="lightbox-btn left" aria-label="media précédent"><i class="fa fa-angle-left"></i>
        </button>
        <div class="ligthbox__container-img">${this.typeMedia.renderElement}
        <p class="lightbox__title">${this.currentMedia.title}</p>
        </div>`;

    lbContainer.appendChild(div);

    return lbContainer;
  }
}
export { LightboxFactory };
