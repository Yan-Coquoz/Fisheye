export class Image {
  constructor(image, date) {
    this.image = image;
    this.date = date;
  }
  displayImage() {
    const assets = "../../public/assets/images/";
    return `<div class="card_media--img">
    <img src=${assets}${this.image} alt="photo faite le ${this.date}"></div>`;
  }
}
