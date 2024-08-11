import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInformacaoComponent } from './usuario-informacao.component';

describe('UsuarioInformacaoComponent', () => {
  let component: UsuarioInformacaoComponent;
  let fixture: ComponentFixture<UsuarioInformacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioInformacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioInformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
