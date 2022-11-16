import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApprovalDetailsComponent } from './student-approval-details.component';

describe('StudentDetailsComponent', () => {
  let component: StudentApprovalDetailsComponent;
  let fixture: ComponentFixture<StudentApprovalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApprovalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApprovalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
