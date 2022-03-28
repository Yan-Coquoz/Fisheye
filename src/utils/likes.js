// toutes les likes d'un photographe
export function getAllLike(datas) {
  let initValue = 0; // indice
  const likes = datas.reduce((previous, current) => {
    return previous + current.likes;
  }, initValue);
  return likes;
}
