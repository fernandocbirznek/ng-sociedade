import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioConquistasComponent } from './usuario-conquistas.component';

describe('UsuarioConquistasComponent', () => {
  let component: UsuarioConquistasComponent;
  let fixture: ComponentFixture<UsuarioConquistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioConquistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioConquistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
