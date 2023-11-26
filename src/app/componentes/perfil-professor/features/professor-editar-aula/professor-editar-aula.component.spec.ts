import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorEditarAulaComponent } from './professor-editar-aula.component';

describe('ProfessorEditarAulaComponent', () => {
  let component: ProfessorEditarAulaComponent;
  let fixture: ComponentFixture<ProfessorEditarAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorEditarAulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorEditarAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
