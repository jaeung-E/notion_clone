import { push } from "../utils/router";

export default function ChildLink({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $childList = document.querySelector(".child-list");

    $childList.innerHTML = `
      ${this.state
        .map(({ id, title }) => {
          return `
          <div class='link-container' data-id='${id}'>
            <a href='/documents/${id}'>
              <div class='focusable'>
                <div>${title}</div>
              </div>
            </a>
          </div>
        `;
        })
        .join("")}
    `;
  };

  this.init = () => {
    const $childList = document.createElement("div");
    $childList.classList.add("child-list");
    $target.appendChild($childList);

    $childList.addEventListener("click", (e) => {
      e.preventDefault();
      const { id } = e.target.closest(".link-container").dataset;
      push(`/documents/${id}`);
    });
  };
}
