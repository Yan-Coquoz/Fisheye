// Factory pour les medias
import { TypeMediaFactory } from "./TypeMediaFactory.js";
import { onLikes, addLikes } from "../utils/likes.js";

class MediaFactory {
  constructor(media) {
    this.id = media.id;
    this.date = media.date; // yyyy-mm-dd
    this.likes = media.likes;
    this.price = media.price;
    this.title = media.title;
    this.image = media.image;
    this.video = media.video;
    this.medias = media;
    this.onOpenModale = this.onOpenModale.bind(this);
    document
      .querySelectorAll("article .card_media-container")
      .forEach((elt) => {
        elt.addEventListener("keyup", this.onOpenModale);
      });
  }
  /**
   * @param {number} likes les likes courant
   * @returns
   */
  setLikes(likes) {
    this.likes = likes;
    return this.likes;
  }
  getLikes() {
    return this.likes;
  }

  onOpenModale(evt) {
    if (evt.key === "Enter") {
      this.openLightbox(evt);
    }
  }
  /**
   * ouvre la lightbox
   * @param {MouseEvent} evt
   */
  openLightbox(evt) {
    evt.preventDefault();

    const modal = document.getElementById("lightbox");
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";

    document
      .querySelectorAll("article .card_media-container")
      .forEach((elt) => {
        elt.setAttribute("tabindex", "-1");
      });

    const section = document.querySelector("section.media_content");
    section.setAttribute("tabindex", "-1");
    section.setAttribute("aria-hidden", "true");

    document.querySelectorAll(".likes_container").forEach((elt) => {
      elt.setAttribute("tabindex", "-1");
    });

    document.removeEventListener("keyup", this.onOpenModale);
  }

  // Stucture des filtres
  getSortMediaDom() {
    const filtreBloc = document.createElement("form");
    const formulaire = `
      <label for="tri" class="form-label">Trier par </label>
        <select class="form-select" name="choice" id="tri">
         
          <option class="form-options" value="popularite">Popularité</option>
          
          <option class="form-options" value="date">Date</option>
          
          <option class="form-options" value="titre">Titre</option>
          
        </select> 
    `;

    filtreBloc.classList.add("form-block");
    filtreBloc.setAttribute("aria-labelledby", "media-container");
    filtreBloc.setAttribute("aria-hidden", "false");
    filtreBloc.innerHTML = formulaire;
    return filtreBloc;
  }

  /**
   * Card media
   * @returns HTMLElement
   */
  getCardMediaDom() {
    const mediaBox = document.createElement("article");
    const media = new TypeMediaFactory(this.medias);
    const cardMedia = document.createElement("div");
    const cardMediaContainer = document.createElement("div");
    const para = document.createElement("p");
    const span = document.createElement("span");
    const spanIcon = document.createElement("span");
    const containtSpan = document.createElement("div");

    cardMedia.classList.add("card_media");
    cardMedia.setAttribute("aria-label", `media ${this.title}`);
    cardMedia.setAttribute("aria-hidden", "false");

    cardMediaContainer.classList.add("card_media-container");
    cardMediaContainer.setAttribute("tabindex", `0`);
    cardMediaContainer.addEventListener("click", this.openLightbox.bind(this));
    cardMediaContainer.addEventListener("keyup", this.onOpenModale.bind(this));

    para.classList.add("card_media--title");
    para.textContent = this.title;

    containtSpan.classList.add("likes_container");
    containtSpan.setAttribute("tabindex", "0");
    mediaBox.classList.add("media-box");

    span.classList.add("likes");
    span.textContent = this.getLikes();
    spanIcon.setAttribute("class", "fas fa-heart");
    spanIcon.setAttribute("aria-label", "likes");

    cardMedia.appendChild(cardMediaContainer);
    cardMediaContainer.appendChild(media);
    containtSpan.appendChild(span);
    containtSpan.appendChild(spanIcon);
    para.appendChild(containtSpan);

    mediaBox.appendChild(cardMedia);
    mediaBox.appendChild(para);

    containtSpan.addEventListener("click", onLikes);
    containtSpan.addEventListener("keyup", addLikes);

    return mediaBox;
  }
}
export { MediaFactory };
