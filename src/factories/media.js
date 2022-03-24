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
  getId() {
    return this.id;
  }
  getDate() {
    return this.date;
  }
  getLikes() {
    return this.likes;
  }
  getPrice() {
    return this.price;
  }
  getTitle() {
    return this.title;
  }
  get TypeMedia() {
    return this.image ? this.image : this.video;
  }
  getFormMediaDom() {
    const formBloc = document.createElement("form");
    const formulaire = `
      <label for="trie" class="form-label">Trier par </label>
        <select class="form-select" name="choice" id="trie">
          <option value="" selected disabled hidden >-- Trier par --</option>

          <option class="form-options" value="popularite">Popularité</option>
          
          <option class="form-options" value="date">Date</option>
          
          <option class="form-options" value="titre">Titre</option>
          
        </select> 
    `;
    formBloc.classList.add("form-block");
    formBloc.innerHTML = formulaire;
    return formBloc;
  }

  getCardMediaDom() {
    const mediaBox = document.createElement("article");
    const media = this.isImgOrVid(this.TypeMedia);
    mediaBox.classList.add("media-box");
    // TODO ouverture de la lightbox

    // icone => jonglé avec fas(plein) et far(creux)
    mediaBox.innerHTML = `
    <figure class="card_media >
        <a href="#lightbox" onclick="displayLightbox(${this.id})"> 
          ${media}
        </a>
        <p class="card_media--title">${this.title} <span>${this.likes} <i class="fas fa-heart"></i></span></p>
    </figure>
     `;
    return mediaBox;
  }
  isImgOrVid(element) {
    // TODO ajouter l'accessibilité
    const assets = "../../public/assets/images/";
    // console.log("-- __", element);
    if (element.includes(".jpg")) {
      return `<div class="card_media--img">
      <img src=${assets}${element} alt="photo faite le ${this.date}">
      </div>`;
    } else if (element.includes(".mp4")) {
      return `<video  controls class="card_media--vid">
      <source src="${assets}${element}" type="video/mp4">
      </video>`;
    }
  }
}
export { MediaFactory };
