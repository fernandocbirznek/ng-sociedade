import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacaoGeralForumComponent } from './informacao-geral-forum.component';

describe('InformacaoGeralForumComponent', () => {
  let component: InformacaoGeralForumComponent;
  let fixture: ComponentFixture<InformacaoGeralForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacaoGeralForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacaoGeralForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
