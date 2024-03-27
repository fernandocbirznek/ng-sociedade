import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPerfilVisualizarComponent } from './professor-perfil-visualizar.component';

describe('ProfessorPerfilVisualizarComponent', () => {
  let component: ProfessorPerfilVisualizarComponent;
  let fixture: ComponentFixture<ProfessorPerfilVisualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorPerfilVisualizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorPerfilVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
