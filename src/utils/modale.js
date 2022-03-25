function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.setAttribute("aria-hidden", "false");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
}
function openLBModal(id) {
  const modal = document.getElementById("lightbox");
  modal.setAttribute("aria-hidden", "false");
  modal.style.display = "block";
  localStorage.setItem("idMedia", id);
}
