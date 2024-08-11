import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicaQuatroComponent } from './mecanica-quatro.component';

describe('MecanicaQuatroComponent', () => {
  let component: MecanicaQuatroComponent;
  let fixture: ComponentFixture<MecanicaQuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MecanicaQuatroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanicaQuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
