import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorEditarSessaoComponent } from './professor-editar-sessao.component';

describe('ProfessorEditarSessaoComponent', () => {
  let component: ProfessorEditarSessaoComponent;
  let fixture: ComponentFixture<ProfessorEditarSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorEditarSessaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorEditarSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
