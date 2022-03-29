export class Video {
  constructor(video) {
    this.video = video;
  }
  displayVideo() {
    const assets = "../../public/assets/images/";
    return `<video  controls class="card_media--vid" ">
    <source src="${assets}${this.video}" type="video/mp4">
    </video>`;
  }
}
