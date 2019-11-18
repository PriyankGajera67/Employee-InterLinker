import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionApprovedListComponent } from './connection-approved-list.component';

describe('ConnectionApprovedListComponent', () => {
  let component: ConnectionApprovedListComponent;
  let fixture: ComponentFixture<ConnectionApprovedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionApprovedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionApprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
