import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAulaPosteriorAnteriorComponent } from './editar-aula-posterior-anterior.component';

describe('EditarAulaPosteriorAnteriorComponent', () => {
  let component: EditarAulaPosteriorAnteriorComponent;
  let fixture: ComponentFixture<EditarAulaPosteriorAnteriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAulaPosteriorAnteriorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAulaPosteriorAnteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
