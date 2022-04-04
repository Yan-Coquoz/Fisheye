import { Image } from "./imageFactory.js";
import { Video } from "./videoFactory.js";

export class TypeMediaFactory {
  /**
   *
   * @param {objet} media - propiétés d'un media
   * @returns
   */
  constructor(media) {
    // console.log(media);
    // je regarde si la bonne propriété existe
    if (media.hasOwnProperty("image")) {
      return new Image(media.image, media.date, media.id).displayImage();
    } else if (media.hasOwnProperty("video")) {
      return new Video(media.video, media.id).displayVideo();
    } else {
      throw new Error("Type de format inconnu.");
    }
  }
}
