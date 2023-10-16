import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuvidaMecanicaComponent } from './duvida-mecanica.component';

describe('DuvidaMecanicaComponent', () => {
  let component: DuvidaMecanicaComponent;
  let fixture: ComponentFixture<DuvidaMecanicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuvidaMecanicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuvidaMecanicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
