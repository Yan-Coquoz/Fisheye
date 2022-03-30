export class Video {
  constructor(video, id) {
    this.video = video;
    this.id = id;
  }
  displayVideo() {
    const assets = "../../public/assets/images/";
    return `<video id="${this.id}" controls class="card_media--vid media-item" >
    <source src="${assets}${this.video}" type="video/mp4">
    </video>`;
  }
}
