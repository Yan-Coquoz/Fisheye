// ouverture de la modale de formulaire
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

// fermeture de la modale de formulaire
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// ouverture de la modale de la lightbox
function openLBModal() {
  const modal = document.getElementById("lightbox");
  const cardMedia = document.querySelector(".card_media--img");
  cardMedia.classList.add("ligthbox");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  modal.style.display = "block";
}
function closeLBModal() {
  const modal = document.getElementById("lightbox");
  const cardMedia = document.querySelector(".card_media--img");
  modal.innerHTML = "";
  cardMedia.classList.remove("ligthbox");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
}
