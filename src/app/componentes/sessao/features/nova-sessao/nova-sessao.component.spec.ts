import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSessaoComponent } from './nova-sessao.component';

describe('NovaSessaoComponent', () => {
  let component: NovaSessaoComponent;
  let fixture: ComponentFixture<NovaSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaSessaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
