import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarForumTopicoReplicaComponent } from './atualizar-forum-topico-replica.component';

describe('AtualizarForumTopicoReplicaComponent', () => {
  let component: AtualizarForumTopicoReplicaComponent;
  let fixture: ComponentFixture<AtualizarForumTopicoReplicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarForumTopicoReplicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarForumTopicoReplicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
