import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicaTresComponent } from './mecanica-tres.component';

describe('MecanicaTresComponent', () => {
  let component: MecanicaTresComponent;
  let fixture: ComponentFixture<MecanicaTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MecanicaTresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanicaTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
