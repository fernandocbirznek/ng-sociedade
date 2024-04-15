import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTabelaProfessorComponent } from './administrador-tabela-professor.component';

describe('AdministradorTabelaProfessorComponent', () => {
  let component: AdministradorTabelaProfessorComponent;
  let fixture: ComponentFixture<AdministradorTabelaProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTabelaProfessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTabelaProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
