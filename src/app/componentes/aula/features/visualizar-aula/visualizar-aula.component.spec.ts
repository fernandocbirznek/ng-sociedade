import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAulaComponent } from './visualizar-aula.component';

describe('VisualizarAulaComponent', () => {
  let component: VisualizarAulaComponent;
  let fixture: ComponentFixture<VisualizarAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarAulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
