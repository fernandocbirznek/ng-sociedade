import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirAreaInteresseComponent } from './inserir-area-interesse.component';

describe('InserirAreaInteresseComponent', () => {
  let component: InserirAreaInteresseComponent;
  let fixture: ComponentFixture<InserirAreaInteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirAreaInteresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirAreaInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
