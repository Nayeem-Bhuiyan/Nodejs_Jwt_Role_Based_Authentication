import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotPasswordComponent } from './fogot-password.component';

describe('FogotPasswordComponent', () => {
  let component: FogotPasswordComponent;
  let fixture: ComponentFixture<FogotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FogotPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FogotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
