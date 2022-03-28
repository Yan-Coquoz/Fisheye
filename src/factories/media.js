// Factory pour les medias
// gerer les cas ou c'est une image ou une video
class MediaFactory {
  constructor(media) {
    this.id = media.id;
    this.date = media.date; //yyyy-mm-dd
    this.likes = media.likes;
    this.price = media.price;
    this.title = media.title;
    this.image = media.image;
    this.video = media.video;
  }

  get TypeMedia() {
    return this.image ? this.image : this.video;
  }
  // Stucture des filtres
  getSortMediaDom() {
    const formBloc = document.createElement("form");
    const formulaire = `
      <label for="trie" class="form-label">Trier par </label>
        <select class="form-select" name="choice" id="trie">
         
          <option class="form-options" value="popularite">Popularité</option>
          
          <option class="form-options" value="date">Date</option>
          
          <option class="form-options" value="titre">Titre</option>
          
        </select> 
    `;
    formBloc.classList.add("form-block");
    formBloc.setAttribute("aria-labelledby", "media-container");
    formBloc.innerHTML = formulaire;
    return formBloc;
  }
  // Card media
  getCardMediaDom() {
    const mediaBox = document.createElement("article");
    const media = this.isImgOrVid(this.TypeMedia);
    mediaBox.classList.add("media-box");
    mediaBox.innerHTML = `
    <figure class="card_media" aria-label="media ${this.title}"  onclick="openLBModal(${this.id})" >
     <div aria-label="agrandir le media" tabindex="0" > 
          ${media}
        </div>
        <figcation class="card_media--title">${this.title} <span>${this.likes} <i class="fas fa-heart"></i></span></figcation>
    </figure>
     `;

    return mediaBox;
  }
  // TODO cree un classe TypeMediafactory qui va regarder quel type de media retourner
  isImgOrVid(element) {
    const assets = "../../public/assets/images/";

    if (element.includes(".jpg")) {
      return `<div class="card_media--img">
      <img src=${assets}${element} alt="photo faite le ${this.date}">
      </div>`;
    } else if (element.includes(".mp4")) {
      return `<video  controls class="card_media--vid" ">
      <source src="${assets}${element}" type="video/mp4">
      
      </video>`;
    }
  }
}
export { MediaFactory };
