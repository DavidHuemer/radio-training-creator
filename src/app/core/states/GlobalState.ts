import {InjectionToken} from "@angular/core";
import {RxState} from "@rx-angular/state";
import {User} from "../data/User";

export interface GlobalState {
  user: User | null,
}

export const initialGlobalState: GlobalState = {
  user: null
}

export const GLOBAL_RX_STATE = new InjectionToken<RxState<GlobalState>>('GLOBAL_RX_STATE');
