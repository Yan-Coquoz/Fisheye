class DetailPhotographer extends PhotographerFactory {
  constructor(idMedia, title, image, date, likes, price, photographerId, id) {
    super(id);
    this.idMedia = idMedia;
    this.title = title;
    this.image = image;
    this.date = date;
    this.likes = likes;
    this.price = price;
    this.photographerId = photographerId;
  }

  afficheData() {
    return "super " + super.id;
  }
}
