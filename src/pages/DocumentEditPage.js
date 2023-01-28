import ChildLink from "../components/ChildLink.js";
import Editor from "../components/Editor.js";
import Spinner from "../components/Spinner.js";

export default function DocumentEditPage({ $target, initialState, onEdit }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    const { id, title, content, documents, isLoading } = this.state;

    spinner.init();
    editor.init();
    childLink.init();
    editor.setState({ id, title, content });
    childLink.setState({ documents });
    spinner.setState({ isLoading });
  };

  const spinner = new Spinner({
    $target,
    initialState: {
      isLoading: this.state.isLoading,
    },
  });

  const editor = new Editor({
    $target,
    initialState: {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content,
    },
    onEdit,
    spinner,
  });

  const childLink = new ChildLink({
    $target,
    initialState: {
      documents: this.state.documents,
    },
  });

  this.render = () => {
    $target.innerHTML = `
      <h1>해당 문서는 존재하지 않는 문서입니다!</h1>
    `;
  };
}
