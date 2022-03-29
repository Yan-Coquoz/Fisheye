class LightboxFactory {
  constructor() {}
  getLightboxDOM() {
    const lbContainer = document.querySelector("#lightbox");
    const assets = "../../public/assets/images/";
    const div = document.createElement("div");
    const contentLightbox = `
    <button class="lightbox-btn close" onclick="closeLBModal()" aria-label="Bouton de fermeture"><i class="fa fa-times"></i></button>
        <button class="lightbox-btn right" aria-label="media suivant"><i class="fa fa-angle-right"></i>
        </button>
        <button class="lightbox-btn left" aria-label="media précédent"><i class="fa fa-angle-left"></i>
        </button>
        <div class="ligthbox__container-img">bla bla<img src="${assets}" alt="media">
        </div>`;

    div.innerHTML = contentLightbox;
    lbContainer.appendChild(div);
    return lbContainer;
  }
}
export { LightboxFactory };
