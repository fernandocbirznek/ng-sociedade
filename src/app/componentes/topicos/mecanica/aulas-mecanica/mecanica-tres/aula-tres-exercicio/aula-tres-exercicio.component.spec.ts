import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaTresExercicioComponent } from './aula-tres-exercicio.component';

describe('AulaTresExercicioComponent', () => {
  let component: AulaTresExercicioComponent;
  let fixture: ComponentFixture<AulaTresExercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AulaTresExercicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaTresExercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
