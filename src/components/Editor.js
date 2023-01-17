import { request } from "../utils/api.js";

export default function Editor({ $target, initialState }) {
  let $editor = null;
  let timer = null;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector(".title").value = title;
    $editor.querySelector(".content").value = content;
  };

  this.init = () => {
    $editor = document.createElement("div");
    $editor.classList.add("editor");
    $target.appendChild($editor);

    $editor.innerHTML = `
      <div class="input-container">
        <input class="title" type="text" placeholder="제목을 입력해 주세요"/>
        <textarea class="content" placeholder="내용을 입력해 주세요"></textarea> 
      </div>
    `;

    $editor.addEventListener("keyup", () => {
      const documentTitle = document.querySelector(
        `li[data-id='${this.state.id}'] span`
      );
      const titleValue = document.querySelector(".title").value;
      const contentValue = document.querySelector(".content").value;
      documentTitle.textContent = titleValue;

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const nextState = {
          ...this.state,
          title: titleValue,
          content: contentValue,
        };

        this.setState(nextState);
        await request(`/documents/${this.state.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title:
              this.state.title.trim() !== "" ? this.state.title : "제목 없음",
            content: this.state.content,
          }),
        });
      }, 500);
    });
  };
}
