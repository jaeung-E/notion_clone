export default function RootPage({ $target }) {
  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $target.innerHTML = `
      <h1>This is Root Page!</h1>
    `;
  };
}
