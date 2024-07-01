import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarForumComponent } from './atualizar-forum.component';

describe('AtualizarForumComponent', () => {
  let component: AtualizarForumComponent;
  let fixture: ComponentFixture<AtualizarForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
