import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InservendorComponent } from './inservendor.component';

describe('InservendorComponent', () => {
  let component: InservendorComponent;
  let fixture: ComponentFixture<InservendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InservendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InservendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
