import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageContainerComponent} from './page-container.component';
import {By} from "@angular/platform-browser";

describe('PageContainerComponent', () => {
  let component: PageContainerComponent;
  let fixture: ComponentFixture<PageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageContainerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title in the header', async () => {
    const expectedTitle = 'Test titel';
    component.title = expectedTitle;

    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(titleElement.innerHTML).toBe(expectedTitle);
  });

  it('should not show the username if the username is null', async () => {
    component.userName = null;
    fixture.detectChanges();
    const userNameElement = fixture.debugElement.query(By.css('.username-container'));
    expect(userNameElement).toBeFalsy();
  });

  it('should show the username if the username is not null', async () => {
    const expectedUserName = 'Max Mustermann';
    component.userName = expectedUserName;
    fixture.detectChanges();
    const userNameElement = fixture.debugElement.query(By.css('.username'));
    expect(userNameElement.nativeElement.innerHTML).toBe(expectedUserName);
  });

  it('should call logout when the user clicks on the logout button', () => {
    spyOn(component.logout, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.logout.emit).toHaveBeenCalledTimes(1);
  });
});
