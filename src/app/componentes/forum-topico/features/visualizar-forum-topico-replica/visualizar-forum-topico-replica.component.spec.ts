import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarForumTopicoReplicaComponent } from './visualizar-forum-topico-replica.component';

describe('VisualizarForumTopicoReplicaComponent', () => {
  let component: VisualizarForumTopicoReplicaComponent;
  let fixture: ComponentFixture<VisualizarForumTopicoReplicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarForumTopicoReplicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarForumTopicoReplicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
