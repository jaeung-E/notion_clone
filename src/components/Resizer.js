import { SIDEBAR_WIDTH } from "../constants/storageKey.js";
import { updateStorage } from "../utils/storage.js";

export default function Resizer({ $target, $resizeElement }) {
  const $resizer = document.createElement("div");
  $resizer.classList.add("resizer");
  $target.appendChild($resizer);

  let x = 0;
  let width = 0;

  const handleMouseDown = (e) => {
    x = e.clientX;
    width = getWidth($resizeElement);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    updateStorage(SIDEBAR_WIDTH, getWidth($resizeElement));
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const moveX = e.clientX - x;

    $resizeElement.style.width = `${width + moveX}px`;
    $resizeElement.nextElementSibling.style.paddingLeft =
      getWidth($resizeElement);
  };

  const getWidth = (element) => {
    return parseInt(window.getComputedStyle(element).width);
  };

  $resizer.addEventListener("mousedown", handleMouseDown);
}
