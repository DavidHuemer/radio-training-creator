import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogContainerComponent} from './dialog-container.component';

describe('DialogContainerComponent', () => {
  let component: DialogContainerComponent;
  let fixture: ComponentFixture<DialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogContainerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the exit event', () => {
    spyOn(component.exit, 'emit');
    component.exitClicked();
    expect(component.exit.emit).toHaveBeenCalledTimes(1);
  });
});
