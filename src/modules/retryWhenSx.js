import { delay, mergeMap, retryWhen, take } from "rxjs/operators";
import { interval, of, throwError } from "rxjs";
import addListItem from "../helpers/addListItem";
import emoji from "../constants/emoji";

const retryWhenStrategy = () => errors => {
  return errors.pipe(delay(1000));
};

const retryWhen$ = interval(1000).pipe(
  mergeMap(count => {
    if (emoji[count] === "🍩") {
      return throwError("🚫");
    }
    return of(count);
  }),
  retryWhen(retryWhenStrategy()),
  take(10)
);

function retryWhenSx() {
  retryWhen$.subscribe(count => addListItem("retry-when", emoji[count]));
}

export default retryWhenSx;
