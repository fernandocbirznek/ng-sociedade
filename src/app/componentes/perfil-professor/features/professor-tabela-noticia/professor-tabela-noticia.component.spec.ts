import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorTabelaNoticiaComponent } from './professor-tabela-noticia.component';

describe('ProfessorTabelaNoticiaComponent', () => {
  let component: ProfessorTabelaNoticiaComponent;
  let fixture: ComponentFixture<ProfessorTabelaNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorTabelaNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorTabelaNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
