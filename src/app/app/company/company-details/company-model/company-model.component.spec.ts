import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsDialog } from './company-model.component';

describe('CompanyDetailsDialog', () => {
  let component: CompanyDetailsDialog;
  let fixture: ComponentFixture<CompanyDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDetailsDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
