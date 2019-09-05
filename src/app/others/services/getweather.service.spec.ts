import { TestBed } from '@angular/core/testing';

import { GetWeatherService } from './getweather.service';

describe('GetWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetweatherserviceService = TestBed.get(GetWeatherService);
    expect(service).toBeTruthy();
  });
});
