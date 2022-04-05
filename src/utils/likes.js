export function onLikes() {
  let likeSelected = 0;
  //le footer contenant le nbr de likes
  const footerLikes = document.querySelector(".likes_container-footer > span");
  console.log(footerLikes);
  document.querySelectorAll(".likes_container").forEach((elt) => {
    elt.addEventListener("click", () => {
      // element séléctionné
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
    });
  });
}

// toutes les likes d'un photographe
/**
 * @param {array} datas d'un photographe
 * @returns
 */
export function getAllLike(datas) {
  let initValue = 0; // indice
  return datas.reduce((previous, current) => {
    return previous + current.likes;
  }, initValue);
}
