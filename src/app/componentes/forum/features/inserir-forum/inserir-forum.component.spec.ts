import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirForumComponent } from './inserir-forum.component';

describe('InserirForumComponent', () => {
  let component: InserirForumComponent;
  let fixture: ComponentFixture<InserirForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
