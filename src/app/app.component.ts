import {Component, Inject} from '@angular/core';
import {GLOBAL_RX_STATE, GlobalState, initialGlobalState} from "./core/states/GlobalState";
import {RxState} from "@rx-angular/state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Funkübungen';

  constructor(@Inject(GLOBAL_RX_STATE) globalState: RxState<GlobalState>) {
    globalState.set(initialGlobalState);
  }
}
