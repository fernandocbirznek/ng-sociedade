import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTopicoComponent } from './forum-topico.component';

describe('ForumTopicoComponent', () => {
  let component: ForumTopicoComponent;
  let fixture: ComponentFixture<ForumTopicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumTopicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
