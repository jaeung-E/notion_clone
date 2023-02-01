export default function SidebarTitle({ $target, onClick }) {
  const $sidebarTitle = document.createElement("div");
  $sidebarTitle.classList.add("sidebar-title");
  $target.appendChild($sidebarTitle);

  this.render = () => {
    $sidebarTitle.innerHTML = `
      <a href="/">
        <div class='title-container'>
          <img src='/assets/Woong.png' />
          <span>Jaeung's Notion</span>
        </div>
      </a>
    `;
  };

  this.render();

  $sidebarTitle.addEventListener("click", (e) => {
    e.preventDefault();
    onClick();
  });
}
