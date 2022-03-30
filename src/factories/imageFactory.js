export class Image {
  constructor(image, date, id) {
    this.image = image;
    this.date = date;
    this.id = id;
  }
  displayImage() {
    const assets = "../../public/assets/images/";
    return `<div class="card_media--img">
    <img src=${assets}${this.image} class="media-item" id="${this.id}" alt="photo faite le ${this.date}"></div>`;
  }
}
