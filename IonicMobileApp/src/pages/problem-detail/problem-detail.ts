/**
 * Copyright 2017 IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, LatLng } from '@ionic-native/google-maps';

// @IonicPage()
@Component({
  selector: 'page-problem-detail',
  templateUrl: 'problem-detail.html',
})
export class ProblemDetailPage {
  grievance: any;
  baseUrl: any;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('--> ProblemDetailPage constructor() called');
    this.grievance = navParams.get('grievance');
    this.baseUrl = navParams.get('baseUrl');
  }

  ionViewDidLoad() {
    console.log('--> ProblemDetailPage ionViewDidLoad() called');
    this.loadMap();
  }

  loadMap() {
    let loc = new LatLng(this.grievance.geoLocation.coordinates[1], this.grievance.geoLocation.coordinates[0]);
    let mapOptions = {
      camera: {
        target: loc,
        zoom: 15,
        tilt: 10
      }
    };
    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.createMarker(loc, 'Home');
    });
  }

  createMarker(loc: LatLng, title: String) {
    let markerOptions: any = {
      position: loc,
      title: title
    }
    return this.map.addMarker(markerOptions).then((marker: Marker) => {
      // marker.showInfoWindow();
    }).catch(err => {
      console.log(err);
    });
  }
}
