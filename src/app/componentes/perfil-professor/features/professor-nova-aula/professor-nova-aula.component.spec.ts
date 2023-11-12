import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorNovaAulaComponent } from './professor-nova-aula.component';

describe('ProfessorNovaAulaComponent', () => {
  let component: ProfessorNovaAulaComponent;
  let fixture: ComponentFixture<ProfessorNovaAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorNovaAulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorNovaAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
