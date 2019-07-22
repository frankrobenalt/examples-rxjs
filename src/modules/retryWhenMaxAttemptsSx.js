import { interval, of, throwError } from "rxjs";
import { mergeMap, retryWhen } from "rxjs/operators";
import addListItem from "../helpers/addListItem";
import emoji from "../constants/emoji";

const retryWhenMaxAttemptsStrategy = maxRetryAttempts => errors => {
  return errors.pipe(
    mergeMap((error, count) => {
      const retryAttempt = count + 1;

      if (retryAttempt > maxRetryAttempts) {
        console.log(
          `retryWhenMaxAttemptsSx Error: Failed after ${maxRetryAttempts} attempt(s).`
        );
        return throwError(error);
      }

      console.log(`retryWhenMaxAttemptsSx: Retry ${retryAttempt}.`);

      return of(errors);
    })
  );
};

const retryWhenMaxAttempts$ = interval(1000).pipe(
  mergeMap(count => {
    if (emoji[count] === "🍩") {
      return throwError("🚫");
    }
    return of(count);
  }),
  retryWhen(retryWhenMaxAttemptsStrategy(2))
);

function retryWhenMaxAttemptsSx() {
  retryWhenMaxAttempts$.subscribe(
    count => addListItem("retry-when-max", emoji[count]),
    error => addListItem("retry-when-max", error)
  );
}

export default retryWhenMaxAttemptsSx;
