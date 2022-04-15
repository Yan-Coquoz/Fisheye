/**
 * @param {array} datas d'un photographe
 * @returns number
 */
export function getAllLike(datas) {
  let initValue = 0; // indice
  return datas.reduce((previous, current) => {
    return previous + current.likes;
  }, initValue);
}

export function onLikes() {
  // a la souris
  document.removeEventListener("keyup", onLikes);
  document.removeEventListener("click", onLikes);

  document.querySelectorAll(".likes_container").forEach((elt) => {
    elt.addEventListener("click", () => {
      MoreOrLess(elt);
    });
  });

  // au clavier
  document.querySelectorAll(".likes_container").forEach((elt) => {
    elt.addEventListener("keyup", (evt) => {
      if (evt.key === "+" || evt.key === "Enter") {
        MoreOrLess(elt);
      }
    });
  });
}

function MoreOrLess(elt) {
  const footerLikes = document.querySelector(".likes_container-footer > span");

  const currentHeartValue = elt.querySelector(".likes_container >.likes");
  const currentHeartIcon = elt.querySelector("span.fas.fa-heart");

  currentHeartIcon.classList.toggle("active");
  currentHeartValue.classList.toggle("active");
  // nombre de like total
  let currentNbrLike = Number(footerLikes.textContent);

  if (
    currentHeartIcon.classList.contains("active") &&
    currentHeartValue.classList.contains("active")
  ) {
    currentHeartIcon.style.color = "#db8876";
    currentHeartValue.textContent++;
    footerLikes.textContent = ++currentNbrLike;
  } else {
    currentHeartIcon.style.color = "#901c1c";
    currentHeartValue.textContent--;
    footerLikes.textContent = --currentNbrLike;
  }
}
