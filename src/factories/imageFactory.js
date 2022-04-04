export class Image {
  constructor(image, date, id) {
    this.image = image;
    this.date = date;
    this.id = id;
  }
  displayImage() {
    const assets = "../../public/assets/images/";
    const div = document.createElement("div");
    div.classList.add("card_media--img");
    div.setAttribute("onclick", "openLBModal()");

    const image = document.createElement("img");
    image.src = `${assets}${this.image}`;
    image.id = this.id;
    image.setAttribute("alt", `photo faite le ${this.date}`);

    div.appendChild(image);

    return div;
  }
}
