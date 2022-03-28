function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
function openLBModal(id) {
  const modal = document.getElementById("lightbox");

  modal.style.display = "block";
  localStorage.setItem("idMedia", id);
}
