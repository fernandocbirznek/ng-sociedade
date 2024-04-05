import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoAulaComponent } from './aluno-aula.component';

describe('AlunoAulaComponent', () => {
  let component: AlunoAulaComponent;
  let fixture: ComponentFixture<AlunoAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoAulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
