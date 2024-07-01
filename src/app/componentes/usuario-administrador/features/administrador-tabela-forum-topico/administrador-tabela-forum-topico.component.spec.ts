import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTabelaForumTopicoComponent } from './administrador-tabela-forum-topico.component';

describe('AdministradorTabelaForumTopicoComponent', () => {
  let component: AdministradorTabelaForumTopicoComponent;
  let fixture: ComponentFixture<AdministradorTabelaForumTopicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTabelaForumTopicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTabelaForumTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
