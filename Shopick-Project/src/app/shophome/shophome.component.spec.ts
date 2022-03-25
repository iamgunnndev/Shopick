import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShophomeComponent } from './shophome.component';

describe('ShophomeComponent', () => {
  let component: ShophomeComponent;
  let fixture: ComponentFixture<ShophomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShophomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShophomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
