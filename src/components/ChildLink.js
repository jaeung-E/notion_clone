export default function ChildLink({ $target, initialState, onClick }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $childList = document.querySelector(".child-list");
    const { documents } = this.state;

    $childList.innerHTML = `
      ${documents
        .map(({ id, title }) => {
          return `
          <div class='link-wrapper' data-id='${id}'>
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
      const { id } = e.target.closest(".link-wrapper").dataset;
      e.preventDefault();
      onClick(id);
    });
  };
}
