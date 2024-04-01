import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioAreaInteresseComponent } from './editar-usuario-area-interesse.component';

describe('EditarUsuarioAreaInteresseComponent', () => {
  let component: EditarUsuarioAreaInteresseComponent;
  let fixture: ComponentFixture<EditarUsuarioAreaInteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarUsuarioAreaInteresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUsuarioAreaInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
