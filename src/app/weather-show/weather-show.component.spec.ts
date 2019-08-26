import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherShowComponent } from './weather-show.component';

describe('WeatherShowComponent', () => {
  let component: WeatherShowComponent;
  let fixture: ComponentFixture<WeatherShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
