import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarForumTopicoComponent } from './atualizar-forum-topico.component';

describe('AtualizarForumTopicoComponent', () => {
  let component: AtualizarForumTopicoComponent;
  let fixture: ComponentFixture<AtualizarForumTopicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarForumTopicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarForumTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
