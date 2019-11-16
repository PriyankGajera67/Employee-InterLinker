import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConnnectionsComponent } from './user-connnections.component';

describe('UserConnnectionsComponent', () => {
  let component: UserConnnectionsComponent;
  let fixture: ComponentFixture<UserConnnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConnnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConnnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
