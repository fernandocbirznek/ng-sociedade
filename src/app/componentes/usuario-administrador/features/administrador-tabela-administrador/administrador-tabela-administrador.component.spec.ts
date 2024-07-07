import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTabelaAdministradorComponent } from './administrador-tabela-administrador.component';

describe('AdministradorTabelaAdministradorComponent', () => {
  let component: AdministradorTabelaAdministradorComponent;
  let fixture: ComponentFixture<AdministradorTabelaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTabelaAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTabelaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
