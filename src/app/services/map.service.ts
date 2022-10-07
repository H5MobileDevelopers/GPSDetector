import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _currentLocation: any;
  constructor() { }
  set currentLocation(location: any) {
    this._currentLocation = location;
  }
  get currentLocation(): any {
    return this._currentLocation;
  }
}
