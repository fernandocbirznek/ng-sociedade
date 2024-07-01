import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorInformacaoComponent } from './administrador-informacao.component';

describe('AdministradorInformacaoComponent', () => {
  let component: AdministradorInformacaoComponent;
  let fixture: ComponentFixture<AdministradorInformacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorInformacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorInformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
