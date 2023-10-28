import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPerfilComponent } from './criar-perfil.component';

describe('CriarPerfilComponent', () => {
  let component: CriarPerfilComponent;
  let fixture: ComponentFixture<CriarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
