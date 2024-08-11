import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeContatoComponent } from './equipe-contato.component';

describe('EquipeContatoComponent', () => {
  let component: EquipeContatoComponent;
  let fixture: ComponentFixture<EquipeContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipeContatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
