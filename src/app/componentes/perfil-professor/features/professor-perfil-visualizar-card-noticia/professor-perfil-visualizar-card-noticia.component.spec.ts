import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPerfilVisualizarCardNoticiaComponent } from './professor-perfil-visualizar-card-noticia.component';

describe('ProfessorPerfilVisualizarCardNoticiaComponent', () => {
  let component: ProfessorPerfilVisualizarCardNoticiaComponent;
  let fixture: ComponentFixture<ProfessorPerfilVisualizarCardNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorPerfilVisualizarCardNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorPerfilVisualizarCardNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
