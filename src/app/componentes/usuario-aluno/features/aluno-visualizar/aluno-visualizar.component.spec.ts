import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoVisualizarComponent } from './aluno-visualizar.component';

describe('AlunoVisualizarComponent', () => {
  let component: AlunoVisualizarComponent;
  let fixture: ComponentFixture<AlunoVisualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoVisualizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
