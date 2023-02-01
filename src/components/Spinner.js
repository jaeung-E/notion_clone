export default function Spinner({
  $target,
  initialState = {
    isLoading: false,
  },
}) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.render(nextState.isLoading);
    this.state = nextState;
  };

  this.render = (beforeState) => {
    const { isLoading } = this.state;
    const $ring = document.querySelector(".lds-ring");

    if (isLoading !== beforeState && $ring) {
      $ring.classList.toggle("hidden");
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
