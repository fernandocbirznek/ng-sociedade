import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarForumTopicoRespostaComponent } from './visualizar-forum-topico-resposta.component';

describe('VisualizarForumTopicoRespostaComponent', () => {
  let component: VisualizarForumTopicoRespostaComponent;
  let fixture: ComponentFixture<VisualizarForumTopicoRespostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarForumTopicoRespostaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarForumTopicoRespostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
