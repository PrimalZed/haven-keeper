import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pHelpComponent } from './p2p-help.component';

describe('P2pHelpComponent', () => {
  let component: P2pHelpComponent;
  let fixture: ComponentFixture<P2pHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2pHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
