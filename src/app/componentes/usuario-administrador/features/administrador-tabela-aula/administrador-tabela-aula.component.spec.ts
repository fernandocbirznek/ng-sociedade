import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTabelaAulaComponent } from './administrador-tabela-aula.component';

describe('AdministradorTabelaAulaComponent', () => {
  let component: AdministradorTabelaAulaComponent;
  let fixture: ComponentFixture<AdministradorTabelaAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTabelaAulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTabelaAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
