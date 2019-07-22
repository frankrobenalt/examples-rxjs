import { interval, of, throwError, timer } from "rxjs";
import { mergeMap, retryWhen } from "rxjs/operators";
import addListItem from "../helpers/addListItem";
import emoji from "../constants/emoji";

const retryWhenIntervalStrategy = (
  maxRetryAttempts,
  retryIntervals
) => errors => {
  return errors.pipe(
    mergeMap((error, count) => {
      const retryAttempt = count + 1;
      const defaultInterval = 1;

      if (retryAttempt > maxRetryAttempts) {
        console.log(
          `retryWhenIntervalSx Error: Failed after ${maxRetryAttempts} attempt(s).`
        );
        return throwError(error);
      }

      console.log(
        `retryWhenIntervalSx: Retrying in ${retryIntervals[count] ||
          defaultInterval} second(s).`
      );

      return timer(retryIntervals[count] * 1000 || defaultInterval * 1000);
    })
  );
};

const retryWhenInterval$ = interval(1000).pipe(
  mergeMap(count => {
    if (emoji[count] === "🍩") {
      return throwError("🚫");
    }
    return of(count);
  }),
  retryWhen(retryWhenIntervalStrategy(2, [2]))
);

function retryWhenIntervalSx() {
  retryWhenInterval$.subscribe(
    count => addListItem("retry-when-interval", emoji[count]),
    error => addListItem("retry-when-interval", error)
  );
}

export default retryWhenIntervalSx;
