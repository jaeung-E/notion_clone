export default function Spinner({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.render(nextState.isLoading);
    this.state = nextState;
  };

  this.render = (beforeState) => {
    const { isLoading } = this.state;

    if (isLoading !== beforeState) {
      document.querySelector(".lds-ring").classList.toggle("hidden");
    }
  };

  this.init = () => {
    const $spinner = document.createElement("div");
    $spinner.classList.add("spinner");
    $target.appendChild($spinner);

    $spinner.innerHTML = `
      <div class="lds-ring hidden">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  };
}
