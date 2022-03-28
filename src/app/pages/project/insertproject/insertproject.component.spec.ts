import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertprojectComponent } from './insertproject.component';

describe('InsertprojectComponent', () => {
  let component: InsertprojectComponent;
  let fixture: ComponentFixture<InsertprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
