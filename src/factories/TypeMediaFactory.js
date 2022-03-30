import { Image } from "./imageFactory.js";
import { Video } from "./videoFactory.js";

export class TypeMediaFactory {
  constructor(media) {
    console.log(media);
    // je regarde si la bonne propriété existe
    if (media.hasOwnProperty("image")) {
      const img = new Image(media.image, media.date, media.id);
      this.renderElement = img.displayImage();
      return this.renderElement;
    } else if (media.hasOwnProperty("video")) {
      const vid = new Video(media.video, media.id);
      this.renderElement = vid.displayVideo();
      return this.renderElement;
    } else {
      throw new Error("Type de format inconnu.");
    }
  }
}
