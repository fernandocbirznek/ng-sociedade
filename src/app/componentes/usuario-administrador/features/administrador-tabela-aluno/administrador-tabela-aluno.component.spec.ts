import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTabelaAlunoComponent } from './administrador-tabela-aluno.component';

describe('AdministradorTabelaAlunoComponent', () => {
  let component: AdministradorTabelaAlunoComponent;
  let fixture: ComponentFixture<AdministradorTabelaAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTabelaAlunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTabelaAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
