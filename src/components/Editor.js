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
      const { id } = this.state;
      spinner.setState({ isLoading: true });

      if (timer) {
        clearTimeout(timer);
      }

      const isTitle = e.target
        .closest("div")
        .classList.contains("editor-title");
      const isContent = e.target.classList.contains("editor-content");

      if (isTitle) {
        const $documentTitle = document.querySelector(
          `li[data-id='${id}'] span`
        );
        this.setState({ ...this.state, title: e.target.value });
        $documentTitle.textContent = this.state.title;
      }

      if (isContent) {
        this.setState({ ...this.state, content: e.target.value });
      }

      timer = setTimeout(async () => {
        const { id, title, content } = this.state;
        onEdit({ id, title, content });
        spinner.setState({ isLoading: false });
      }, 500);
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
