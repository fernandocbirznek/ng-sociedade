import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorTabelaAulaComponent } from './professor-tabela-aula.component';

describe('ProfessorTabelaAulaComponent', () => {
  let component: ProfessorTabelaAulaComponent;
  let fixture: ComponentFixture<ProfessorTabelaAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorTabelaAulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorTabelaAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
