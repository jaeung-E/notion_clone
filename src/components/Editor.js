export default function Editor({ $target, initialState, onEdit, spinner }) {
  let timer = null;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    document.querySelector(".editor-title input").value = title;
    document.querySelector(".editor-content").value = content;
  };

  this.init = () => {
    const $editor = document.createElement("div");
    $editor.classList.add("editor-container");
    $target.appendChild($editor);

    $editor.innerHTML = `
      <div class="editor-title">
        <input type="text" placeholder="제목을 입력해 주세요"/>
      </div>
      <textarea class="editor-content" placeholder="내용을 입력해 주세요"></textarea> 
    `;

    $editor.addEventListener("keyup", (e) => {
      onEdit(e);
    });

    window.addEventListener("click", () => {
      if (timer) {
        const { id, title, content } = this.state;
        const $documentTitle = document.querySelector(
          `li[data-id='${id}'] span`
        );
        $documentTitle.textContent = this.state.title;

        clearTimeout(timer);
        timer = null;
        onEdit({ id, title, content });
        spinner.setState({ isLoading: false });
      }
    });
  };
}
