import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacarouselComponent } from './macarousel.component';

describe('MacarouselComponent', () => {
  let component: MacarouselComponent;
  let fixture: ComponentFixture<MacarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MacarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MacarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
