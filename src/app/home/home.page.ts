import {Component, OnInit} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {MapService} from '../services/map.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private geolocation: Geolocation,
              public mapService: MapService) {}

  lat;
  lng;
  lastCoords = {lat: 5.5, lng: 80.555};
  currentCoords;
  lastGap;
  async ngOnInit() {
    this.getLocation();
    await this.delay(10000);
    // console.log('x' , this.currentCoords, this.lastCoords);
    this.ngOnInit();
  }
  async getLocation() {
    this.geolocation.getCurrentPosition().then(async (resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      const coords = {
        lat: this.lat,
        lng: this.lng
      };
      this.currentCoords = coords;
      this.getDistanceFromLoc(this.lastCoords, coords);
      await this.delay(500);
      if (this.lastGap !== 0) {
        this.mapService.currentLocation = this.currentCoords;
        // console.log('A rest call', this.currentCoords);
      } else {
        // console.log('Not a rest call');
      }
      this.lastCoords = this.currentCoords;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  getDistanceFromLoc(loc1, loc2) {
    const R = 6371; // km
    const dLat = this.toRad(loc2.lat - loc1.lat);
    const dLon = this.toRad(loc2.lng - loc1.lng);
    const lat1 = this.toRad(loc1.lat);
    const lat2 = this.toRad(loc2.lat);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    this.lastGap = d * 1000;
  }
  toRad(Value) {
    return Value * Math.PI / 180;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
