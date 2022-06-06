import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoeComponent } from './aoe.component';

describe('AoeComponent', () => {
  let component: AoeComponent;
  let fixture: ComponentFixture<AoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
