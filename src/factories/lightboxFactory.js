import { TypeMediaFactory } from "./TypeMediaFactory.js";

class LightboxFactory {
  constructor(id, media) {
    this.currentId = id;
    this.mediaId = media.id;
    this.mediaImage = new TypeMediaFactory(media);
    this.mediaTitle = media.title;
    // injecte le HTML à la création de la LB
    const lbox = this.getLightboxDOM();
    document.body.appendChild(lbox);
  }

  getLightboxDOM() {
    const lbContainer = document.querySelector("#lightbox");
    const div = document.createElement("div");
    const contentLightbox = `
    <button class="lightbox-btn close" onclick="closeLBModal()" aria-label="Bouton de fermeture"><i class="fa fa-times"></i></button>
        <button class="lightbox-btn right" aria-label="media suivant"><i class="fa fa-angle-right"></i>
        </button>
        <button class="lightbox-btn left" aria-label="media précédent"><i class="fa fa-angle-left"></i>
        </button>
        <div class="ligthbox__container-img">${this.mediaImage.renderElement}
        <p class="lightbox__title">${this.mediaTitle}</p></div>`;

    div.innerHTML = contentLightbox;
    lbContainer.appendChild(div);
    return lbContainer;
  }
}
export { LightboxFactory };
