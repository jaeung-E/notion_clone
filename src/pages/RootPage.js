import DocumentList from "../components/DocumentList.js";
import { request } from "../utils/api.js";

export default function RootPage({ $target }) {
  const $page = document.createElement('div');
  $page.classList.add('page-container');

  const documentList = new DocumentList({
    $target: $page,
    initialState: []
  });

  this.setState = async () => {
    const documents = await request('/documents');
    documentList.setState(documents);
    this.render();
  }

  this.render = () => {
    $target.appendChild($page);
  }
}
