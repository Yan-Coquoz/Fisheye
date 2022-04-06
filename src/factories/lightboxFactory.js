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
    this.onKeyUp = this.onKeyUp.bind(this);
    this.boxContentMedia = document.createElement("div");
    this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
    document.addEventListener("keyup", this.onKeyUp);
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

  onKeyUp(evt) {
    console.log("keyup");
    if (evt.key === "Escape") {
      this.closeLb(evt);
    }
  }

  /**
   * @param {MouseEvent} e
   */
  closeLb(evt) {
    evt.preventDefault();
    console.log("close modal");
    const modal = document.getElementById("lightbox");
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    // on le supprime de la mémoire
    document.removeEventListener("keyup", this.onKeyUp);
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
  prevMedia(evt) {
    evt.preventDefault();

    const currentMediaId = getIndexCurrentMedia.bind(
      this,
      this.currentId,
      this.datas
    );
    console.log(currentMediaId);
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

    const contentMedia = document.createElement("div");
    const title = document.createElement("p");

    div.classList.add("lightbox-container");

    this.boxContentMedia.classList.add("lightbox-media");
    this.boxContentMedia.id = this.currentId;

    btnLeft.classList.add("lightbox-btn", "left");
    btnLeft.setAttribute("tabindex", "0");
    btnLeft.setAttribute("aria-label", "média précédent");
    btnLeft.addEventListener("click", this.prevMedia);

    btnRight.classList.add("lightbox-btn", "right");
    btnRight.setAttribute("tabindex", "0");
    btnRight.setAttribute("aria-label", "média suivant");

    spanCloseIcon.classList.add("fa", "fa-times");
    spanLeftIcon.classList.add("fa", "fa-angle-left");
    spanRightIcon.classList.add("fa", "fa-angle-right");

    btnClose.classList.add("lightbox-btn", "close");
    // btnClose.setAttribute("onclick", "closeLBModal()");
    btnClose.setAttribute("tabindex", "0");
    btnClose.setAttribute("aria-label", "Bouton de fermeture");

    title.classList.add("lightbox__title");
    title.textContent = this.currentMedia.title;

    contentMedia.classList.add("ligthbox__container-img");
    contentMedia.appendChild(this.typeMedia);
    // DOM
    this.boxContentMedia.appendChild(contentMedia);
    this.boxContentMedia.appendChild(title);

    btnClose.appendChild(spanCloseIcon);
    btnLeft.appendChild(spanLeftIcon);
    btnRight.appendChild(spanRightIcon);

    div.appendChild(btnClose);
    div.appendChild(btnLeft);
    div.appendChild(btnRight);
    div.appendChild(this.boxContentMedia);
    // ecouteur sur la fermeture
    div
      .querySelector(".lightbox-btn.close")
      .addEventListener("click", this.closeLb.bind(this));

    return div;
  }

  onLoad() {
    const media = this.getCurrentMedia();
    console.log("onLoad m-- ", media);
  }
}
export { LightboxFactory };
