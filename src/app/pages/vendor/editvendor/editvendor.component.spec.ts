import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvendorComponent } from './editvendor.component';

describe('EditvendorComponent', () => {
  let component: EditvendorComponent;
  let fixture: ComponentFixture<EditvendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditvendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
