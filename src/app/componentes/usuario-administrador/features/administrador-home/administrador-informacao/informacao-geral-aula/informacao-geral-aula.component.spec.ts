import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacaoGeralAulaComponent } from './informacao-geral-aula.component';

describe('InformacaoGeralAulaComponent', () => {
  let component: InformacaoGeralAulaComponent;
  let fixture: ComponentFixture<InformacaoGeralAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacaoGeralAulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacaoGeralAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
