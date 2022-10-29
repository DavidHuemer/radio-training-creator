import {Component, Inject, OnInit} from '@angular/core';
import {BaseAuthPage} from "../../../shared/basics/BaseAuthPage";
import {GLOBAL_RX_STATE, GlobalState} from "../../../core/states/GlobalState";
import {RxState} from "@rx-angular/state";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent extends BaseAuthPage implements OnInit {

  constructor(@Inject(GLOBAL_RX_STATE) globalState: RxState<GlobalState>) {
    super(globalState);
  }

  ngOnInit(): void {
  }

}
