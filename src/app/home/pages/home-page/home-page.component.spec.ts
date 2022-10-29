import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageComponent} from './home-page.component';
import {GLOBAL_RX_STATE, GlobalState} from "../../../core/states/GlobalState";
import {AuthService} from "../../../core/services/auth/auth.service";
import {UserService} from "../../../core/services/auth/user.service";
import {RxState} from "@rx-angular/state";
import SpyObj = jasmine.SpyObj;
import {of} from "rxjs";
import {User} from "../../../core/data/User";

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  let globalStateMock: RxState<GlobalState>;
  let authServiceMock: SpyObj<AuthService>;
  let userServiceMock: SpyObj<UserService>;

  beforeEach(async () => {
    globalStateMock = new RxState<GlobalState>();
    authServiceMock = jasmine.createSpyObj('AuthService', ['getUserId']);
    userServiceMock = jasmine.createSpyObj('UserService', ['getUserByUserId']);

    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [
        {provide: GLOBAL_RX_STATE, useValue: globalStateMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: UserService, useValue: userServiceMock}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the user of the global state', async () => {
    authServiceMock.getUserId.and.returnValue('exampleUserId');
    const returningUser: User = {
      documentId: 'exampleUserId',
      lastName: 'mustermann',
      firstName: 'max'
    };

    userServiceMock.getUserByUserId.and.returnValue(of(returningUser));
    component.updateUser();
    fixture.detectChanges();
    globalStateMock.select('user').subscribe(x => {
      expect(x).toBe(returningUser);
    })
  });

  it('should set the user null when the current user is null', function () {
    authServiceMock.getUserId.and.returnValue(undefined);
    component.updateUser();
    fixture.detectChanges();
    globalStateMock.select('user').subscribe(x => {
      expect(x).toBe(null);
    })
  });
});
