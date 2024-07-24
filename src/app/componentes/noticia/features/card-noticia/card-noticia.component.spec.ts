import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNoticiaComponent } from './card-noticia.component';

describe('CardNoticiaComponent', () => {
  let component: CardNoticiaComponent;
  let fixture: ComponentFixture<CardNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
