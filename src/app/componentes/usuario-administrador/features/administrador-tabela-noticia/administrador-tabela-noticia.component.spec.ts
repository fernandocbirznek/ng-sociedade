import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTabelaNoticiaComponent } from './administrador-tabela-noticia.component';

describe('AdministradorTabelaNoticiaComponent', () => {
  let component: AdministradorTabelaNoticiaComponent;
  let fixture: ComponentFixture<AdministradorTabelaNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTabelaNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTabelaNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
