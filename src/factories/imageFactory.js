export class Image {
  constructor(image, date, id, title) {
    this.image = image;
    this.date = date;
    this.id = id;
    this.title = title;
  }
  displayImage() {
    const assets = "../../public/assets/images/";

    const div = document.createElement("div");
    div.classList.add("card_media--img");
    div.setAttribute("data-title", `${this.title}`);
    div.setAttribute("data-id", `${this.id}`);

    const image = document.createElement("img");
    image.src = `${assets}${this.image}`;
    image.id = this.id;
    image.setAttribute("alt", `${this.title}, fait le ${this.date}`);

    div.appendChild(image);

    return div;
  }
}
