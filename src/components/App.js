import RootPage from '../pages/RootPage.js';
import DocumentEditPage from '../pages/DocumentEditPage.js';
import { initRouter } from '../utils/router.js';

export default function App({ $target }) {
  const rootPage = new RootPage({ $target });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: 0,
      document: {
        title : '',
        content: ''
      }
    }
  });

  this.route = () => {
    $target.innerHTML = '';
    const { pathname } = window.location;

    if (pathname === '/') {
      rootPage.setState();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      documentEditPage.setState({ documentId: documentId });
    }
  }

  this.route();

  initRouter(() => this.route());
}
