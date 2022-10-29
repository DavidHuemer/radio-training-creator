import {Component, Inject, OnInit} from '@angular/core';
import {GLOBAL_RX_STATE, GlobalState} from "../../../core/states/GlobalState";
import {RxState} from "@rx-angular/state";
import {AuthService} from "../../../core/services/auth/auth.service";
import {UserService} from "../../../core/services/auth/user.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(@Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.updateUser();
  }

  updateUser() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.globalState.connect('user', this.userService.getUserByUserId(userId));
    } else {
      this.globalState.set('user', () => null);
    }
  }

}
