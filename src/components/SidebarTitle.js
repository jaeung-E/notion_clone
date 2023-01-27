import { push } from "../utils/router";

export default function SidebarTitle({ $target }) {
  const $sidebarTitle = document.createElement("div");
  $sidebarTitle.classList.add("sidebar-title");
  $target.appendChild($sidebarTitle);

  this.render = () => {
    $sidebarTitle.innerHTML = `
    <a href="/"><div>Jaeung's Notion</div></a>
    `;
  };

  this.render();

  $sidebarTitle.addEventListener("click", (e) => {
    e.preventDefault();
    push("/");
  });
}
