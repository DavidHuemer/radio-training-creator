/**
 * Base class for all pages that requires auth
 */
import {RxState} from "@rx-angular/state";
import {GlobalState} from "../../core/states/GlobalState";
import {map} from "rxjs";

export abstract class BaseAuthPage {
  userName$ = this.globalState.select('user').pipe(
    map((user) => {
      if (user == null)
        return null;

      return `${user.firstName} ${user.lastName}`;
    })
  )

  protected constructor(private globalState: RxState<GlobalState>) {
  }
}
