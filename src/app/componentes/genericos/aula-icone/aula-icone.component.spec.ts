import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaIconeComponent } from './aula-icone.component';

describe('AulaIconeComponent', () => {
  let component: AulaIconeComponent;
  let fixture: ComponentFixture<AulaIconeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AulaIconeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaIconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
