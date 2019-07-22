import { interval, of, throwError } from "rxjs";
import { mergeMap, retry } from "rxjs/operators";
import addListItem from "../helpers/addListItem";
import emoji from "../constants/emoji";

const retry$ = interval(1000).pipe(
  mergeMap(count => {
    if (emoji[count] === "🍩") {
      return throwError("🚫");
    }
    return of(count);
  }),
  retry(2)
);

function retrySx() {
  retry$.subscribe(
    count => addListItem("retry", emoji[count]),
    error => addListItem("retry", error)
  );
}

export default retrySx;
