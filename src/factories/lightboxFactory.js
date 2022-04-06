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
    this.currentId = Number(id);
    this.currentMedia = media;
    this.datas = datas;
    this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
  }

  /**
   * @param {object} media - le media selectioné
   * @returns
   */
  setCurrentMedia(media) {
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
    const div = document.createElement("div");

    const btnClose = document.createElement("button");
    const spanCloseIcon = document.createElement("span");

    const btnLeft = document.createElement("button");
    const spanLeftIcon = document.createElement("span");

    const btnRight = document.createElement("button");
    const spanRightIcon = document.createElement("span");

    const boxContentMedia = document.createElement("div");
    const contentMedia = document.createElement("div");
    const title = document.createElement("p");

    div.classList.add("lightbox-container");
    boxContentMedia.classList.add("lightbox-media");
    contentMedia.classList.add("ligthbox__container-img");
    title.classList.add("lightbox__title");

    btnLeft.classList.add("lightbox-btn", "left");
    btnLeft.setAttribute("tabindex", "0");
    btnLeft.setAttribute("aria-label", "média précédent");

    btnRight.classList.add("lightbox-btn", "right");
    btnRight.setAttribute("tabindex", "0");
    btnRight.setAttribute("aria-label", "média suivant");

    spanCloseIcon.classList.add("fa", "fa-times");
    spanLeftIcon.classList.add("fa", "fa-angle-left");
    spanRightIcon.classList.add("fa", "fa-angle-right");

    btnClose.classList.add("lightbox-btn", "close");
    btnClose.setAttribute("onclick", "closeLBModal()");
    btnClose.setAttribute("tabindex", "0");
    btnClose.setAttribute("aria-label", "Bouton de fermeture");

    title.textContent = this.currentMedia.title;
    contentMedia.appendChild(this.typeMedia);
    // DOM
    boxContentMedia.appendChild(contentMedia);
    boxContentMedia.appendChild(title);

    btnClose.appendChild(spanCloseIcon);
    btnLeft.appendChild(spanLeftIcon);
    btnRight.appendChild(spanRightIcon);

    div.appendChild(btnClose);
    div.appendChild(btnLeft);
    div.appendChild(btnRight);
    div.appendChild(boxContentMedia);

    // console.log("-- lbn-- ", div);

    return div;
  }
}
export { LightboxFactory };
// div.innerHTML = `
// <button class="lightbox-btn close" onclick="closeLBModal()" tabindex="0" aria-label="Bouton de fermeture"><i class="fa fa-times"></i></button>

//     <button class="lightbox-btn right" tabindex="0" aria-label="media suivant"><i class="fa fa-angle-right"></i>
//     </button>

//     <button class="lightbox-btn left" tabindex="0" aria-label="media précédent"><i class="fa fa-angle-left"></i>
//     </button>

//     <div class="ligthbox__container-img">${this.typeMedia}
//     <p class="lightbox__title">${this.currentMedia.title}</p>
//     </div>`;
