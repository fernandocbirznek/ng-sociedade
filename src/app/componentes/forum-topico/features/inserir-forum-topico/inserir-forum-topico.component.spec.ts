import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirForumTopicoComponent } from './inserir-forum-topico.component';

describe('InserirForumTopicoComponent', () => {
  let component: InserirForumTopicoComponent;
  let fixture: ComponentFixture<InserirForumTopicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirForumTopicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirForumTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
