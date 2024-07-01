import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTabelaForumTagComponent } from './administrador-tabela-forum-tag.component';

describe('AdministradorTabelaForumTagComponent', () => {
  let component: AdministradorTabelaForumTagComponent;
  let fixture: ComponentFixture<AdministradorTabelaForumTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTabelaForumTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTabelaForumTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
