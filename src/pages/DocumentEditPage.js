import Editor from '../components/Editor.js';
import DocumentList from '../components/DocumentList.js';
import { request } from '../utils/api.js';

export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement('div');
  $page.classList.add('page-container');
  
  this.state = initialState;

  this.setState = async (nextState) => {
    const documents = await request(`/documents`);
    const document = await request(`/documents/${nextState.documentId}`);
    documentList.setState(documents);
    editor.setState(document);
    this.render();
  };

  const documentList = new DocumentList({
    $target: $page,
    initialState: []
  });

  const editor = new Editor({ 
    $target: $page,
    initialState: {
      title: '',
      content: '',
    } 
  });

  this.render = () => {
    $target.appendChild($page);
  }
}
