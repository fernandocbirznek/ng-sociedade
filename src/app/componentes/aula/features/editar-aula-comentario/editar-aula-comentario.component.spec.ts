import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAulaComentarioComponent } from './editar-aula-comentario.component';

describe('EditarAulaComentarioComponent', () => {
  let component: EditarAulaComentarioComponent;
  let fixture: ComponentFixture<EditarAulaComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAulaComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAulaComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
