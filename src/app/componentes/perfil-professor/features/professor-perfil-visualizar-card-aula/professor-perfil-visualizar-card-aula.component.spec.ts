import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPerfilVisualizarCardAulaComponent } from './professor-perfil-visualizar-card-aula.component';

describe('ProfessorPerfilVisualizarCardAulaComponent', () => {
  let component: ProfessorPerfilVisualizarCardAulaComponent;
  let fixture: ComponentFixture<ProfessorPerfilVisualizarCardAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorPerfilVisualizarCardAulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorPerfilVisualizarCardAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
