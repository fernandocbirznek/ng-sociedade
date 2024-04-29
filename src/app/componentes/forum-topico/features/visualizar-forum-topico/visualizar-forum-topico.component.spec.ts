import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarForumTopicoComponent } from './visualizar-forum-topico.component';

describe('VisualizarForumTopicoComponent', () => {
  let component: VisualizarForumTopicoComponent;
  let fixture: ComponentFixture<VisualizarForumTopicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarForumTopicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarForumTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
