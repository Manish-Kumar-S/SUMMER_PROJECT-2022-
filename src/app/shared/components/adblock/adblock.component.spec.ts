import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdblockComponent } from './adblock.component';

describe('AdblockComponent', () => {
  let component: AdblockComponent;
  let fixture: ComponentFixture<AdblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
