// tri les données par popularité
export function getDataByPop(datas) {
  return datas.sort((a, b) => {
    // 'b'(par sa position) sera la reference et sera comparé à 'a', qui sera l'élément suivant
    // b > a
    return b.likes - a.likes;
  });
}

// tri les données par titre
export function getDataByTitle(datas) {
  return datas.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
}

// tri les données par date
export function getDataByDate(datas) {
  const date = datas.slice().sort((a, b) => {
    // a < b
    const valueA = new Date(a.date);
    const valueB = new Date(b.date);
    return valueB - valueA;
  });
  return date;
}

// réccup 1 photographe
export function getPhotographer(id, users) {
  const datas = users.filter((user) => {
    return user.id === id;
  });
  return datas[0];
}

// réccup les medias d'1 photographe
export function getDatasByPhotographId(id, medias) {
  const datas = medias.filter((media) => {
    return media.photographerId === id;
  });
  return datas;
}
