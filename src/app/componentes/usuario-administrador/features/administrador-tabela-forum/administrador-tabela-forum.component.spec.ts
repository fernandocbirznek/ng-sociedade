import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTabelaForumComponent } from './administrador-tabela-forum.component';

describe('AdministradorTabelaForumComponent', () => {
  let component: AdministradorTabelaForumComponent;
  let fixture: ComponentFixture<AdministradorTabelaForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTabelaForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTabelaForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
