import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirTagComponent } from './inserir-tag.component';

describe('InserirTagComponent', () => {
  let component: InserirTagComponent;
  let fixture: ComponentFixture<InserirTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
