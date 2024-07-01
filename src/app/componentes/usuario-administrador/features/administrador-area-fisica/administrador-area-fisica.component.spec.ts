import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorAreaFisicaComponent } from './administrador-area-fisica.component';

describe('AdministradorAreaFisicaComponent', () => {
  let component: AdministradorAreaFisicaComponent;
  let fixture: ComponentFixture<AdministradorAreaFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorAreaFisicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorAreaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
