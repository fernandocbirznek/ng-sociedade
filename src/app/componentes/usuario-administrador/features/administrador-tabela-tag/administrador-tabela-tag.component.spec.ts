import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTabelaTagComponent } from './administrador-tabela-tag.component';

describe('AdministradorTabelaTagComponent', () => {
  let component: AdministradorTabelaTagComponent;
  let fixture: ComponentFixture<AdministradorTabelaTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTabelaTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTabelaTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
