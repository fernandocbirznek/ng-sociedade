import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorAlterarUsuarioComponent } from './administrador-alterar-usuario.component';

describe('AdministradorAlterarUsuarioComponent', () => {
  let component: AdministradorAlterarUsuarioComponent;
  let fixture: ComponentFixture<AdministradorAlterarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorAlterarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorAlterarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
