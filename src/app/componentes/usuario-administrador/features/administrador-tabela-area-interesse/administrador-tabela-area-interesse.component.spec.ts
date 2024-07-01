import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTabelaAreaInteresseComponent } from './administrador-tabela-area-interesse.component';

describe('AdministradorTabelaAreaInteresseComponent', () => {
  let component: AdministradorTabelaAreaInteresseComponent;
  let fixture: ComponentFixture<AdministradorTabelaAreaInteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTabelaAreaInteresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTabelaAreaInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
