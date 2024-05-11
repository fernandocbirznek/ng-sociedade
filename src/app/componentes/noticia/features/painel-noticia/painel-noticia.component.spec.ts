import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelNoticiaComponent } from './painel-noticia.component';

describe('PainelNoticiaComponent', () => {
  let component: PainelNoticiaComponent;
  let fixture: ComponentFixture<PainelNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
