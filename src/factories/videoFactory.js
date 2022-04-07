export class Video {
  constructor(video, id, title) {
    this.video = video;
    this.id = id;
    this.title = title;
  }
  displayVideo() {
    const assets = "../../public/assets/images/";
    const div = document.createElement("div");
    const video = document.createElement("video");
    const source = document.createElement("source");

    video.classList.add("card_media--vid");
    div.setAttribute("data-title", `${this.title}`);
    div.setAttribute("data-id", `${this.id}`);

    video.classList.add = "media-item";
    video.setAttribute("controls", "");
    video.id = this.id;

    source.setAttribute("src", `${assets}${this.video}`);
    source.setAttribute("type", `video/mp4`);

    video.appendChild(source);
    div.appendChild(video);
    // console.log(div);
    return div;
  }
}
