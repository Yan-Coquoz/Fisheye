import { MediaFactory } from "./media";

class LightboxFactory extends MediaFactory {
  constructor(id, title, likes, image, video) {
    super(id, title, likes, image, video);
    this.btnRight = document.querySelector(".lightbox-btn right");
    this.btnLeft = document.querySelector(".lightbox-btn left");
    this.btnClose = document.querySelector(".lightbox-btn close");
  }
  getLightboxDOM() {
    const lbContainer = document.querySelector("#lightbox");
    const contentLightbox = `
    <div>
        <button class="lightbox-btn close"><i class="fa fa-times"></i></button>
        <button class="lightbox-btn right"><i class="fa fa-angle-right"></i></button>
        <button class="lightbox-btn left"><i class="fa fa-angle-left"></i></button>
        <div class="ligthbox__container-img"></div>
    </div>
    `;
    lbContainer.appendChild(contentLightbox);
    return lbContainer;
  }
}
export { LightboxFactory };
