import { interval } from "rxjs";
import { take } from "rxjs/operators";
import addListItem from "../helpers/addListItem";
import emoji from "../constants/emoji";

const interval$ = interval(1000).pipe(take(10));

function intervalSx() {
  interval$.subscribe(count => addListItem("interval", emoji[count]));
}

export default intervalSx;
