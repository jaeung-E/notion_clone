import DocumentList from "./DocumentList";
import SidebarTitle from "./SideBarTitle";

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement("div");
  $sidebar.classList.add("sidebar");
  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    documentList.setState({ ...this.state });
  };

  const sidebarTitle = new SidebarTitle({ $target: $sidebar });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: this.state.documents,
      selectedId: this.state.selectedId,
    },
  });
}
