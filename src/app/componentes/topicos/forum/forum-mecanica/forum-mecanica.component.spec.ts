import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumMecanicaComponent } from './forum-mecanica.component';

describe('ForumMecanicaComponent', () => {
  let component: ForumMecanicaComponent;
  let fixture: ComponentFixture<ForumMecanicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumMecanicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumMecanicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
