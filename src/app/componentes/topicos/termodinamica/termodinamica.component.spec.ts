import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermodinamicaComponent } from './termodinamica.component';

describe('TermodinamicaComponent', () => {
  let component: TermodinamicaComponent;
  let fixture: ComponentFixture<TermodinamicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermodinamicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermodinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
