import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectsPageComponent} from './projects-page.component';
import {GLOBAL_RX_STATE} from "../../../core/states/GlobalState";
import {of} from "rxjs";
import {User} from "../../../core/data/User";

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let fixture: ComponentFixture<ProjectsPageComponent>;

  let globalStateMock;

  beforeEach(async () => {
    globalStateMock = jasmine.createSpyObj(['select']);
    const user: User = {
      documentId: '',
      firstName: 'Max',
      lastName: 'Mustermann'
    };
    globalStateMock.select.withArgs('user').and.returnValue(of(user))

    await TestBed.configureTestingModule({
      declarations: [ProjectsPageComponent],
      providers: [
        {provide: GLOBAL_RX_STATE, useValue: globalStateMock}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the username', async () => {
    fixture.detectChanges();
    expect(fixture.debugElement.childNodes["0"].nativeNode.userName).toBe('Max Mustermann');
  });
});
