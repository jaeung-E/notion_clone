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
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const moveX = e.clientX - x;
    $resizeElement.style.width = `${width + moveX}px`;
  };

  const getWidth = (element) => {
    return parseInt(window.getComputedStyle(element).width);
  };

  $resizer.addEventListener("mousedown", handleMouseDown);
}
