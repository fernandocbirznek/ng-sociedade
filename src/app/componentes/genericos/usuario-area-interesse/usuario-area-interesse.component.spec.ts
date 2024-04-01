import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAreaInteresseComponent } from './usuario-area-interesse.component';

describe('UsuarioAreaInteresseComponent', () => {
  let component: UsuarioAreaInteresseComponent;
  let fixture: ComponentFixture<UsuarioAreaInteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioAreaInteresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAreaInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
