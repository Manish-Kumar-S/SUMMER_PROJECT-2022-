import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyDriveComponent } from './apply-drive.component';

describe('ApplyDriveComponent', () => {
  let component: ApplyDriveComponent;
  let fixture: ComponentFixture<ApplyDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyDriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
