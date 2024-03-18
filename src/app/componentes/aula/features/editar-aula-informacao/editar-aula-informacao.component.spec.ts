import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAulaInformacaoComponent } from './editar-aula-informacao.component';

describe('EditarAulaInformacaoComponent', () => {
  let component: EditarAulaInformacaoComponent;
  let fixture: ComponentFixture<EditarAulaInformacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAulaInformacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAulaInformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
