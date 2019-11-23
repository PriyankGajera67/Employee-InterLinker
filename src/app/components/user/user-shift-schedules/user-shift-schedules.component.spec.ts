import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShiftSchedulesComponent } from './user-shift-schedules.component';

describe('UserShiftSchedulesComponent', () => {
  let component: UserShiftSchedulesComponent;
  let fixture: ComponentFixture<UserShiftSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShiftSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShiftSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
