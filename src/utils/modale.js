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
function openLBModal(id) {
  const modal = document.getElementById("lightbox");
  modal.style.display = "block";
  localStorage.setItem("idMedia", id);
}
