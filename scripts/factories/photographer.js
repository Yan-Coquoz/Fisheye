function photographerFactory(data) {
  const { city, country, id, price, name, portrait, tagline } = data;
  // console.log(data);
  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const anchor = document.createElement("a");
    const imgBox = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const boxDesc = document.createElement("div");
    const localisation = document.createElement("h3");
    const desc = document.createElement("p");
    const seePrice = document.createElement("p");
    imgBox.classList.add("box--img");
    desc.classList.add("box_desc__desc");
    seePrice.classList.add("box_desc__price");
    boxDesc.classList.add("box_desc");
    localisation.classList.add("box_desc__localite");
    anchor.setAttribute("href", `photographer/${id}`);
    img.setAttribute("src", picture);
    img.setAttribute("alt", `photographe ${name}`);
    h2.textContent = name;
    localisation.textContent = `${city}, ${country}`;
    desc.textContent = tagline;
    seePrice.textContent = `${price}€/jour`;
    article.appendChild(anchor);
    anchor.appendChild(imgBox);
    imgBox.appendChild(img);
    anchor.appendChild(h2);
    boxDesc.appendChild(localisation);
    boxDesc.appendChild(desc);
    boxDesc.appendChild(seePrice);
    article.appendChild(boxDesc);
    return article;
  }
  return { name, picture, id, getUserCardDOM };
}
