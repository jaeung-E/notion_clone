import ChildLink from "../components/ChildLink.js";
import Editor from "../components/Editor.js";
import Spinner from "../components/Spinner.js";

export default function DocumentEditPage({
  $target,
  initialState = {
    title: "",
    content: "",
    documents: [],
    isLoading: false,
  },
  onEdit,
  onClick,
}) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    const { title, content, documents, isLoading } = this.state;

    editor.setState({ title, content });
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
      title: this.state.title,
      content: this.state.content,
    },
    onEdit,
  });

  const childLink = new ChildLink({
    $target,
    initialState: {
      documents: this.state.documents,
    },
    onClick,
  });

  this.render = () => {
    spinner.init();
    editor.init();
    childLink.init();
  };
}
