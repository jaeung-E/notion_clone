import ChildLink from "../components/ChildLink.js";
import Editor from "../components/Editor.js";
import { request } from "../utils/request.js";

export default function DocumentEditPage({ $target, initialState, onEdit }) {
  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;

    try {
      const { id, title, content, documents } = await request(
        `/documents/${this.state.documentId}`
      );

      editor.init();
      childLink.init();
      editor.setState({ id, title, content });
      childLink.setState(documents);
    } catch (e) {
      this.render();
    }
  };

  const editor = new Editor({
    $target,
    initialState: {
      id: "",
      title: "",
      content: "",
    },
    onEdit,
  });

  const childLink = new ChildLink({
    $target,
    initialState: {
      documents: [],
    },
  });

  this.render = () => {
    $target.innerHTML = `
      <h1>해당 문서는 존재하지 않는 문서입니다!</h1>
    `;
  };
}
