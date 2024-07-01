import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirForumTagComponent } from './inserir-forum-tag.component';

describe('InserirForumTagComponent', () => {
  let component: InserirForumTagComponent;
  let fixture: ComponentFixture<InserirForumTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirForumTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirForumTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
