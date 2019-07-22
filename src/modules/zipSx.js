import { delay, map } from "rxjs/operators";
import { range, zip } from "rxjs";
import addListItem from "../helpers/addListItem";
import emoji from "../constants/emoji";

const range$ = range(0, 10);

const zip$ = zip(range$, range$).pipe(
  delay(500),
  map(([count1, count2]) => {
    return `${emoji[count1]} ${emoji[count2]}`;
  })
);

function zipSx() {
  zip$.subscribe(result => addListItem("zip", result.toString()));
}

export default zipSx;
