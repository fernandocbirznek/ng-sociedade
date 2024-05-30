import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaFiltroComponent } from './noticia-filtro.component';

describe('NoticiaFiltroComponent', () => {
  let component: NoticiaFiltroComponent;
  let fixture: ComponentFixture<NoticiaFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiaFiltroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
