import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaFiltroComponent } from './aula-filtro.component';

describe('AulaFiltroComponent', () => {
  let component: AulaFiltroComponent;
  let fixture: ComponentFixture<AulaFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AulaFiltroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
