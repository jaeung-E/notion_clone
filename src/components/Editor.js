export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEdit,
}) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    document.querySelector(".editor-title").textContent = title;
    document.querySelector(".editor-content").value = content;
  };

  this.init = () => {
    const $editor = document.createElement("div");
    $editor.classList.add("editor-container");
    $target.appendChild($editor);

    $editor.innerHTML = `
      <div class="editor-title" contentEditable="true" placeholder="제목을 입력해 주세요">
      </div>
      <main>
        <textarea class="editor-content" placeholder="내용을 입력해 주세요"></textarea> 
      </main>
    `;

    $editor.addEventListener("input", (e) => {
      onEdit(e);
    });

    $editor.addEventListener("keydown", (e) => {
      const isTitle = e.target.classList.contains("editor-title");
      if (isTitle && e.key === "Enter") e.preventDefault();
    });
  };
}
