import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorHomeComponent } from './administrador-home.component';

describe('AdministradorHomeComponent', () => {
  let component: AdministradorHomeComponent;
  let fixture: ComponentFixture<AdministradorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
