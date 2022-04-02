export function onLoadMedia(side) {
  const rightSide = document.querySelectorAll(".right");
  const leftSide = document.querySelectorAll(".left");

  if (side === "right") {
    rightSide.forEach((elt) => {
      console.log(elt);
    });
  } else if (side === "left") {
    console.log("left");
  }
}
