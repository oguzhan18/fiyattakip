import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadenComponent } from './maden.component';

describe('MadenComponent', () => {
  let component: MadenComponent;
  let fixture: ComponentFixture<MadenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MadenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
