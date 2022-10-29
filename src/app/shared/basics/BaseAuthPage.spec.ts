import {TestBed} from '@angular/core/testing';
import {of} from "rxjs";
import {BaseAuthPage} from "./BaseAuthPage";
import {Inject} from "@angular/core";
import {GLOBAL_RX_STATE, GlobalState} from "../../core/states/GlobalState";
import {RxState} from "@rx-angular/state";
import {User} from "../../core/data/User";

class BaseAuthPageImp extends BaseAuthPage {
  constructor(@Inject(GLOBAL_RX_STATE) globalState: RxState<GlobalState>) {
    super(globalState);
  }
}

describe('BaseAuthPage', () => {
  let baseAuthPage: BaseAuthPageImp;
  let globalStateMock;

  beforeEach(async () => {
    globalStateMock = jasmine.createSpyObj(['select']);
    globalStateMock.select.withArgs('user').and.returnValue(of(null))

    await TestBed.configureTestingModule({
      providers: [
        {provide: GLOBAL_RX_STATE, useValue: globalStateMock}
      ]
    })
      .compileComponents();

    baseAuthPage = new BaseAuthPageImp(globalStateMock);
  });

  it('should set the correct user when the user returns null', () => {
    baseAuthPage.userName$.subscribe(x => {
      expect(x).toBeNull();
    });
  });

  it('should set the correct user when the user returns a real user', function () {
    let user: User = {
      documentId: '',
      firstName: 'Max',
      lastName: 'Mustermann'
    }

    globalStateMock = jasmine.createSpyObj(['select']);
    globalStateMock.select.withArgs('user').and.returnValue(of(user));

    baseAuthPage = new BaseAuthPageImp(globalStateMock);
    baseAuthPage.userName$.subscribe(x => {
      expect(x).toBe('Max Mustermann');
    });
  });
});
