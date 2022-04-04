export class Video {
  constructor(video, id) {
    this.video = video;
    this.id = id;
  }
  displayVideo() {
    const assets = "../../public/assets/images/";
    const div = document.createElement("div");
    const video = document.createElement("video");
    const source = document.createElement("source");

    video.classList.add("class", "card_media--vid");
    div.setAttribute("onclick", "openLBModal()");

    video.classList.add = "media-item";
    video.setAttribute("controls", "");
    video.id = this.id;

    source.setAttribute("src", `${assets}${this.video}`);
    source.setAttribute("type", `video/mp4`);

    video.appendChild(source);
    div.appendChild(video);

    return div;
  }
}
