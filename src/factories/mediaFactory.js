// Factory pour les medias
import { TypeMediaFactory } from "./TypeMediaFactory.js";
import { onLikes } from "../utils/likes.js";

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

  // Stucture des filtres
  getSortMediaDom() {
    const formBloc = document.createElement("form");
    const formulaire = `
      <label for="tri" class="form-label">Trier par </label>
        <select class="form-select" name="choice" id="tri">
         
          <option class="form-options" value="popularite">Popularité</option>
          
          <option class="form-options" value="date">Date</option>
          
          <option class="form-options" value="titre">Titre</option>
          
        </select> 
    `;
    formBloc.classList.add("form-block");
    formBloc.setAttribute("aria-labelledby", "media-container");
    formBloc.setAttribute("aria-hidden", "false");
    formBloc.innerHTML = formulaire;
    return formBloc;
  }

  // Card media
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

    para.classList.add("card_media--title");
    para.textContent = this.title;

    containtSpan.classList.add("likes_container");
    containtSpan.setAttribute("tabindex", "0");
    mediaBox.classList.add("media-box");

    span.classList.add("likes");
    span.textContent = this.getLikes();
    spanIcon.setAttribute("class", "fas fa-heart");
    spanIcon.setAttribute("aria-label", "likes");

    // placement dans le DOM
    cardMedia.appendChild(cardMediaContainer);
    cardMediaContainer.appendChild(media);
    containtSpan.appendChild(span);
    containtSpan.appendChild(spanIcon);
    para.appendChild(containtSpan);

    mediaBox.appendChild(cardMedia);
    mediaBox.appendChild(para);

    containtSpan.addEventListener("click", onLikes);
    return mediaBox;
  }
}
export { MediaFactory };
