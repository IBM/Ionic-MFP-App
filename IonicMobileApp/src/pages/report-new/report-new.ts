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
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, LatLng, MyLocation } from '@ionic-native/google-maps';

// @IonicPage()
@Component({
  selector: 'page-report-new',
  templateUrl: 'report-new.html',
})
export class ReportNewPage {
  base64Image : string;
  mapReady: boolean = false;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera : Camera) {
    console.log('--> ReportNewPage constructor() called');
  }

  ionViewDidLoad() {
    console.log('--> ReportNewPage ionViewDidLoad() called');
    this.createMap();
    // this.captureLocation();
  }

  // https://ionicframework.com/docs/native/camera/
  takePhoto() {
    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
      }, (err) => {
        console.log(err);
      }
    );
  }

  createMap() {
    let loc = new LatLng(13.0768342, 77.7886087);
    let mapOptions: GoogleMapOptions = {
      camera: this.getCameraOptions(loc)
    };
    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('--> Map is Ready To Use');
      this.mapReady = true;
    });
    // https://stackoverflow.com/questions/4537164/google-maps-v3-set-single-marker-point-on-map-click
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe( event => {
      console.log('--> ' + event[0]);
      this.map.clear();
      this.createMarker(event[0], 'User selection');
    });
  }

  captureLocation() {
    if (!this.mapReady) {
      this.showToast('Map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null, 2));

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: 'BOUNCE'
          });
        })
      }).then((marker: Marker) => {
        // show the infoWindow
        marker.showInfoWindow();

        // If clicked it, display the alert
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.showToast('clicked!');
        });
      });
  }

  showToast(message: string) {
    console.log('--> Toast: ' + message);
  }

  getCameraOptions(loc: LatLng) {
    let options: any = {
      target: loc,
      zoom: 15,
      tilt: 10
    }
    return options;
  }

  moveCamera(loc: LatLng) {
    this.map.moveCamera(this.getCameraOptions(loc));
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
