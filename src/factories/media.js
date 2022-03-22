// Factory pour les medias
// gerer les cas ou c'est une image ou une video
class MediaFactory {
  constructor(media) {
    this.id = media.id;
    this.date = media.date; //yyyy-mm-dd
    this.likes = media.likes;
    this.price = media.price;
    this.title = media.title;
    this._image = media.image;
    this._video = media.video;
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
    return this._image ? this._image : this._video;
  }
  getFormDom() {
    const formBloc = document.createElement("div");
    const formulaire = `
        <form>
            <label for="trie">Trier par </label>
            <select name="choice" id="trie">
                <option value="popularite">Popularité</option>
                <option value="date">Date</option>
                <option value="titre">Titre</option>
            </select>
        </form>
    
    `;
    formBloc.classList.add("from-block");
    formBloc.innerHTML = formulaire;
    return formBloc;
  }

  getMediaDom() {
    const mediaBox = document.createElement("section");
    const media = this.isImgOrVid(this.TypeMedia);
    mediaBox.classList.add("media-box");
    mediaBox.innerHTML = `
    <figure class="card_media"> 
          ${media}
        <p class="card_media--title">${this.title} <span>${this.likes} ❤</span></p>
    </figure>
     `;
    return mediaBox;
  }
  isImgOrVid(element) {
    const assets = "../../public/assets/images/";
    // console.log("-- __", element);
    if (element.includes(".jpg")) {
      return `<div class="card_media--img"><img src=${assets}${element} alt="${element}"}></div>`;
    } else if (element.includes(".mp4")) {
      return `<video width="350" controls>
      <source src="${assets}${element}" type="video/mp4">
      </video>`;
    }
  }
}
export { MediaFactory };
