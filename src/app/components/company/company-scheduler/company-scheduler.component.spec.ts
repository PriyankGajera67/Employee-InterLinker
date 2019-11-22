import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySchedulerComponent } from './company-scheduler.component';

describe('CompanySchedulerComponent', () => {
  let component: CompanySchedulerComponent;
  let fixture: ComponentFixture<CompanySchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
