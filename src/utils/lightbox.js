import { getIndexCurrentMedia } from "./filtres.js";
// passage au média précédent
export function prevMedia(currentId, datas) {
  console.log("media précédent");
  const currentMediaId = getIndexCurrentMedia(currentId, datas);
  console.log(currentMediaId);
  if (currentMediaId === 0) {
    const i = datas.length - 1;
    return this.setCurrentMedia(datas[i]);
  } else {
    return this.setCurrentMedia(datas[currentMediaId - 1]);
  }
}
