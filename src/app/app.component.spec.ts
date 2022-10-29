import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {GLOBAL_RX_STATE, GlobalState, initialGlobalState} from "./core/states/GlobalState";
import SpyObj = jasmine.SpyObj;
import {RxState} from "@rx-angular/state";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let globalStateMock: SpyObj<RxState<GlobalState>>;

  let globalSateRx: RxState<GlobalState>;
  beforeEach(async () => {

    globalStateMock = jasmine.createSpyObj(['set']);
    globalSateRx = new RxState<GlobalState>();

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: GLOBAL_RX_STATE, useValue: globalSateRx}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'radio-training-creator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Funkübungen');
  });

  it('should set the initial state', async () => {
    globalSateRx.select().subscribe(x => {
      expect(x).toEqual(initialGlobalState);
    });
  });
});
