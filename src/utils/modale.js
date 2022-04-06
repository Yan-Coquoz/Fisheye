// ouverture de la modale de formulaire
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  document.querySelector(".contact_modal-close").focus();
}

// fermeture de la modale de formulaire
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
}

// ouverture de la modale de la lightbox
function openLBModal() {
  const modal = document.getElementById("lightbox");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  modal.style.display = "block";
}
// fermeture de la lightbox
function closeLBModal() {
  const modal = document.getElementById("lightbox");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
}
