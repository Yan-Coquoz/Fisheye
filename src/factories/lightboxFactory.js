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
    // this.onLoad();
  }

  /**
   * @param {object} media le nouveau media courant
   * @returns object
   */
  setCurrentMedia(media) {
    this.currentMedia = media;
    return this.currentMedia;
  }
  getCurrentMedia() {
    // console.log("-_- ", this.currentMedia);
    return this.currentMedia;
  }

  /**
   * gestion des evenements au clavier
   * @param {MouseEvent} e
   */
  onKeyUp(evt) {
    if (evt.key === "Escape") {
      this.closeLb(evt);
    }
  }

  /**
   * Fermeture de la modale (Lightbox)
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
  nextMedia(evt) {
    evt.preventDefault();
    const currentMediaId = getIndexCurrentMedia(this.currentId, this.datas);

    if (this.datas.length - 1 === currentMediaId) {
      this.setCurrentMedia(this.datas[0]);
      this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
      this.onLoad();
    } else {
      this.setCurrentMedia(this.datas[currentMediaId + 1]);
      this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
      this.onLoad();
    }
  }

  /**
   * passage au média précédent
   * @param {MouseEvent} evt
   * @returns object
   */
  prevMedia(evt) {
    evt.preventDefault();
    const currentMediaId = getIndexCurrentMedia(this.currentId, this.datas);

    if (currentMediaId === 0) {
      const i = this.datas.length - 1;
      this.setCurrentMedia(this.datas[i]);
      this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
      this.onLoad();
    } else {
      this.setCurrentMedia(this.datas[currentMediaId - 1]);
      this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
      this.onLoad();
    }
  }
  /**
   * Affiche le nouveau contenu de la modale Lightbox (précédent / suivant)
   */
  async onLoad() {
    const containerBox = document.querySelector(".ligthbox__container-box");
    const title = this.typeMedia.getAttribute("data-title");

    const lbTitle = document.querySelector(".lightbox__title");
    lbTitle.textContent = title;

    containerBox.innerHTML = "";

    containerBox.appendChild(this.typeMedia);
    this.boxContentMedia.appendChild(containerBox);
    this.boxContentMedia.appendChild(lbTitle);
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
    btnLeft.addEventListener("click", this.prevMedia.bind(this));

    btnRight.classList.add("lightbox-btn", "right");
    btnRight.setAttribute("tabindex", "0");
    btnRight.setAttribute("aria-label", "média suivant");
    btnRight.addEventListener("click", this.nextMedia.bind(this));

    spanCloseIcon.classList.add("fa", "fa-times");
    spanLeftIcon.classList.add("fa", "fa-angle-left");
    spanRightIcon.classList.add("fa", "fa-angle-right");

    btnClose.classList.add("lightbox-btn", "close");
    btnClose.setAttribute("tabindex", "0");
    btnClose.setAttribute("aria-label", "Bouton de fermeture");

    title.classList.add("lightbox__title");
    title.textContent = this.currentMedia.title;

    contentMedia.classList.add("ligthbox__container-box");
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
}
export { LightboxFactory };
