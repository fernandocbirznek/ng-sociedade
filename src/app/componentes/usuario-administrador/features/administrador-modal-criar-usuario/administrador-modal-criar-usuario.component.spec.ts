import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorModalCriarUsuarioComponent } from './administrador-modal-criar-usuario.component';

describe('AdministradorModalCriarUsuarioComponent', () => {
  let component: AdministradorModalCriarUsuarioComponent;
  let fixture: ComponentFixture<AdministradorModalCriarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorModalCriarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorModalCriarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
