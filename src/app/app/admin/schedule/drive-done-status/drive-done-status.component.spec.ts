import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveDoneStatusComponent } from './drive-done-status.component';

describe('DriveDoneStatusComponent', () => {
  let component: DriveDoneStatusComponent;
  let fixture: ComponentFixture<DriveDoneStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveDoneStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveDoneStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
