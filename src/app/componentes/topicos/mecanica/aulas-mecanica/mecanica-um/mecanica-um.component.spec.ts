import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicaUmComponent } from './mecanica-um.component';

describe('MecanicaUmComponent', () => {
  let component: MecanicaUmComponent;
  let fixture: ComponentFixture<MecanicaUmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MecanicaUmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanicaUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
