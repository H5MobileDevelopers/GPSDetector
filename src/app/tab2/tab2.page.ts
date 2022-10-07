import { Component } from '@angular/core';
import {MapService} from '../services/map.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  zoom = 17;
  constructor(public mapService: MapService) {}
}
