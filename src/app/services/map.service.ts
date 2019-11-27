import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  currentLocation;
  constructor() { }
  setCurrentLocation(location) {
    this.currentLocation = location;
  }
  get _currentLocation() {
    return this.currentLocation;
  }
}
