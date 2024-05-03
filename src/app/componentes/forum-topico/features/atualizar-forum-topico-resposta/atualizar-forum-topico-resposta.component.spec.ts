import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarForumTopicoRespostaComponent } from './atualizar-forum-topico-resposta.component';

describe('AtualizarForumTopicoRespostaComponent', () => {
  let component: AtualizarForumTopicoRespostaComponent;
  let fixture: ComponentFixture<AtualizarForumTopicoRespostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarForumTopicoRespostaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarForumTopicoRespostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
