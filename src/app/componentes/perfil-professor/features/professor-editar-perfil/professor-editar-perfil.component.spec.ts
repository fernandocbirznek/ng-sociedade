import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorEditarPerfilComponent } from './professor-editar-perfil.component';

describe('ProfessorEditarPerfilComponent', () => {
  let component: ProfessorEditarPerfilComponent;
  let fixture: ComponentFixture<ProfessorEditarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorEditarPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorEditarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
