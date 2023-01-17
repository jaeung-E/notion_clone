import Editor from "../components/Editor.js";
import { request } from "../utils/api.js";

export default function DocumentEditPage({ $target, initialState }) {
  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;

    try {
      const { id, title, content } = await request(
        `/documents/${this.state.documentId}`
      );

      editor.init();
      editor.setState({ id, title, content });
    } catch (e) {
      this.render();
    }
  };

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
  });

  this.render = () => {
    $target.innerHTML = `
      <h1>해당 문서는 존재하지 않는 문서입니다!</h1>
    `;
  };
}
