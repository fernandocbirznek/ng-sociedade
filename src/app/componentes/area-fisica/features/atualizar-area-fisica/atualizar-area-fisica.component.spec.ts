import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarAreaFisicaComponent } from './atualizar-area-fisica.component';

describe('AtualizarAreaFisicaComponent', () => {
  let component: AtualizarAreaFisicaComponent;
  let fixture: ComponentFixture<AtualizarAreaFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarAreaFisicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarAreaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
