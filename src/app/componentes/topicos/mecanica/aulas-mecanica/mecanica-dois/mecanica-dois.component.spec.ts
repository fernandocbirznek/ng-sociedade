import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicaDoisComponent } from './mecanica-dois.component';

describe('MecanicaDoisComponent', () => {
  let component: MecanicaDoisComponent;
  let fixture: ComponentFixture<MecanicaDoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MecanicaDoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanicaDoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
