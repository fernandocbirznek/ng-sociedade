import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorNovaSessaoComponent } from './professor-nova-sessao.component';

describe('ProfessorNovaSessaoComponent', () => {
  let component: ProfessorNovaSessaoComponent;
  let fixture: ComponentFixture<ProfessorNovaSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorNovaSessaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorNovaSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
