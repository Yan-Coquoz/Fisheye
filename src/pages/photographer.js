///Mettre le code JavaScript lié à la page photographer.html

function extractUrlParam() {
  // reccuperation de l'url courante.
  const url = window.location.href;
  const regex = /([^&=]+)=?([^&]*)/g;
  //retourne les parametres de l'url sous forme de tableau
  const getId = regex.exec(url);
  return Number(getId[2]);
}

async function getPhotographerAndDatas() {
  const photographers = await callApi();
  return photographers.json();
}

async function displayPhotographerAndDatas(user, work) {
  const photographHeader = document.querySelector(".photograph-header");
  const photographer = new PhotographerFactory(
    user.id,
    user.name,
    user.portrait,
    user.city,
    user.country,
    user.price,
    user.tagline
  );
  const cardPhotographer = photographer.getPhotographerDOM();
  photographHeader.appendChild(cardPhotographer);
}

function getDatasByPhotographId(id, medias) {
  const datas = medias.filter((media) => {
    return media.photographerId === id;
  });
  return datas;
}
function getPhotographer(id, users) {
  const datas = users.filter((user) => {
    return user.id === id;
  });
  return datas[0];
}
async function rendu() {
  const id = extractUrlParam();
  const { photographers, media } = await getPhotographerAndDatas();
  const datas = getDatasByPhotographId(id, media);
  const photographer = getPhotographer(id, photographers);
  console.log(photographer); // un objet
  console.log(datas); // un tableau d'objets
  displayPhotographerAndDatas(photographer, datas);
}
rendu();
