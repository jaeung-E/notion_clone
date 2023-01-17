import Editor from "../components/Editor.js";
import { request } from "../utils/api.js";

export default function DocumentEditPage({ $target, initialState }) {
  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;

    const { id, title, content } = await request(
      `/documents/${this.state.documentId}`
    );

    editor.init();
    editor.setState({ id, title, content });
  };

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
  });
}
