import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendordetailComponent } from './vendordetail.component';

describe('VendordetailComponent', () => {
  let component: VendordetailComponent;
  let fixture: ComponentFixture<VendordetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendordetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
