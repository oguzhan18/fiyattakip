import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaberlerComponent } from './haberler.component';

describe('HaberlerComponent', () => {
  let component: HaberlerComponent;
  let fixture: ComponentFixture<HaberlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaberlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaberlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
