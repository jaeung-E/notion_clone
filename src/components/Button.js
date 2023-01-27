export default function Button({ $target, content, classes, onClick }) {
  const $button = document.createElement("button");
  $button.classList.add("button", ...classes);
  $target.appendChild($button);

  this.render = () => {
    $button.innerHTML = `
      ${content}
    `;
  };

  this.render();

  $button.addEventListener("click", () => {
    onClick();
  });
}
