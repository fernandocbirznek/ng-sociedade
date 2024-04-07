import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoFavoritadoComponent } from './aluno-favoritado.component';

describe('AlunoFavoritadoComponent', () => {
  let component: AlunoFavoritadoComponent;
  let fixture: ComponentFixture<AlunoFavoritadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoFavoritadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoFavoritadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
