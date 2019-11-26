import {Component, OnInit} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private geolocation: Geolocation) {}

  lat;
  lng;
  coordinated = [{lat: 5.5, lng: 80.555}];
  lastGap;
  ngOnInit() {
  }
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      const coords = {
        lat: this.lat,
        lng: this.lng
      };
      const lastLoc = this.coordinated[this.coordinated.length - 1];
      this.getDistanceFromLoc(lastLoc, coords);
      this.coordinated.push(coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  getCoords() {
    console.log(this.coordinated);
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
    this.lastGap = d;
  }
  toRad(Value) {
    return Value * Math.PI / 180;
  }

}
