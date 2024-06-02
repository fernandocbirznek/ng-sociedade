import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPerfilComponent } from './professor-perfil.component';

describe('ProfessorPerfilComponent', () => {
  let component: ProfessorPerfilComponent;
  let fixture: ComponentFixture<ProfessorPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
