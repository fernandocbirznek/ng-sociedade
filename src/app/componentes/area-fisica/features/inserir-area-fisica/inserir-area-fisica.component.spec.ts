import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirAreaFisicaComponent } from './inserir-area-fisica.component';

describe('InserirAreaFisicaComponent', () => {
  let component: InserirAreaFisicaComponent;
  let fixture: ComponentFixture<InserirAreaFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirAreaFisicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirAreaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
