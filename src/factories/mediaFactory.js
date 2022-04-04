// Factory pour les medias
import { TypeMediaFactory } from "./TypeMediaFactory.js";
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
    mediaBox.classList.add("media-box");

    mediaBox.innerHTML = `
    <figure class="card_media"  aria-label="media ${this.title}" aria-hidden="false" onclick="openLBModal()" >
     <div aria-label="agrandir le media" class="card_media-container" tabindex="0" > 
     <a onclick="${this.id}">
     ${media.renderElement}
     </a>
        </div>
        <figcation class="card_media--title">${this.title} <span>${this.likes} <i class="fas fa-heart"></i></span></figcation>
    </figure>
     `;

    return mediaBox;
  }
}
export { MediaFactory };
