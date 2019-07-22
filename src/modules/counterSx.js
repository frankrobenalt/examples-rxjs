import { fromEvent } from "rxjs";

function counterSx() {
  const counter = document.createElement("div");

  const decrementButton = document.createElement("button");
  decrementButton.innerText = "-";
  counter.appendChild(decrementButton);

  const count = document.createElement("span");
  count.innerText = "0";
  counter.appendChild(count);

  const incrementButton = document.createElement("button");
  incrementButton.innerText = "+";
  counter.appendChild(incrementButton);

  document.body.appendChild(counter);

  const increment$ = fromEvent(incrementButton, "click");
  const decrement$ = fromEvent(decrementButton, "click");

  decrement$.subscribe(() => {
    count.innerText = (parseInt(count.innerText, 10) - 1).toString();
  });

  increment$.subscribe(() => {
    count.innerText = (parseInt(count.innerText, 10) + 1).toString();
  });
}

export default counterSx;
