export default function HomePage({ $target }) {
  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $target.innerHTML = `
      <h1>This is Home Page!</h1>
    `;
  };
}
