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
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, LatLng, MyLocation } from '@ionic-native/google-maps';

import { MyWardDataProvider } from '../../providers/my-ward-data/my-ward-data';
import { AuthHandlerProvider } from '../../providers/auth-handler/auth-handler';

// @IonicPage()
@Component({
  selector: 'page-report-new',
  templateUrl: 'report-new.html',
})
export class ReportNewPage {
  capturedImage: string = null;
  mapReady: boolean = false;
  map: GoogleMap;
  description: string = '';
  address: string = '';
  location: LatLng = null;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera : Camera, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private myWardDataProvider: MyWardDataProvider, private authHandler:AuthHandlerProvider) {
    console.log('--> ReportNewPage constructor() called');
  }

  ionViewDidLoad() {
    console.log('--> ReportNewPage ionViewDidLoad() called');
    this.createMap();
  }

  // https://ionicframework.com/docs/native/camera/
  takePhoto() {
    const options : CameraOptions = {
      quality: 90, // picture quality
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options) .then((imageData) => {
        // this.capturedImage = "data:image/jpeg;base64," + imageData;
        this.capturedImage = imageData;
      }, (err) => {
        console.log(err);
      }
    );
  }

  createMap() {
    let prevLoc = new LatLng(13.0768342, 77.7886087);
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: prevLoc,
        zoom: 15,
        tilt: 10
      }
    };
    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('--> ReportNewPage: Map is Ready To Use');
      this.mapReady = true;
      // https://stackoverflow.com/questions/4537164/google-maps-v3-set-single-marker-point-on-map-click
      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe( event => {
        this.location = event[0];
        console.log('--> ReportNewPage: User clicked location = ' + event[0]);
        this.map.clear();
        this.map.addMarker({
          title: 'Selected location',
          position: event[0]
        }).then((marker: Marker) => {
          marker.showInfoWindow();
        });
      });
    });
  }

  captureLocation() {
    if (!this.mapReady) {
      this.showAlert('Map is not yet ready', 'Map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.location = location.latLng;
      console.log('--> ReportNewPage: Device Location = ' + JSON.stringify(location, null, 2));
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      }).then(() => {
        // add a marker
        this.map.addMarker({
          title: 'Your device location',
          snippet: 'Accurate to ' + location.accuracy + ' meters!',
          position: location.latLng,
          animation: 'BOUNCE'
        }).then((marker: Marker) => {
          marker.showInfoWindow();
        });
      })
    }).catch(err => {
      this.showAlert('Try again', err.error_message);
      console.log(err);
    });
  }

  showAlert(alertTitle, alertMessage) {
    let prompt = this.alertCtrl.create({
      title: alertTitle,
      message: alertMessage,
      buttons: [{
        text: 'Ok',
      }]
    });
    prompt.present();
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present(toast);
  }

  submit() {
    if (this.description === "") {
      this.showAlert('Missing Description', 'Please add a description for the problem you are reporting.');
      return;
    }
    if (this.address === "") {
      this.showAlert('Missing Address', 'Please specify the address of problem location.');
      return;
    }
    if (this.capturedImage === null) {
      this.showAlert('Missing Photo', 'Please take a photo of the problem location.');
      return;
    }
    if (this.location === null) {
      this.showAlert('Missing Geo Location', 'Please mark the location of problem on Maps.');
      return;
    }

    let username = this.authHandler.username;
    let timestamp = this.getDateTime();
    let imageFilename = timestamp + '_' + username + '.jpeg';
    let grievance = {
      "reportedBy": username,
      "reportedDateTime": timestamp,
      "picture": {
        "large": imageFilename,
        "thumbnail": 'thumbnail_' + imageFilename
      },
      "problemDescription": this.description,
      "geoLocation": {
        "type": "Point",
        "coordinates": [
          this.location.lng,
          this.location.lat
        ]
      },
      "address": this.address
    }

    this.loader = this.loadingCtrl.create({
      content: 'Uploading image to server. Please wait ...',
    });
    this.loader.present().then(() => {
      this.myWardDataProvider.uploadImage(imageFilename, this.capturedImage).then(
        (response) => {
          this.loader.dismiss();
          this.showToast('Image Uploaded Successfully');
          this.loader = this.loadingCtrl.create({
            content: 'Uploading data to server. Please wait ...',
          });
          this.loader.present().then(() => {
            this.myWardDataProvider.uploadNewGrievance(grievance).then(
              (response) => {
                this.loader.dismiss();
                this.showToast('Data Uploaded Successfully');
              }, (failure) => {
                this.loader.dismiss();
                this.showAlert('Upload Failed', 'Encountered following error while uploading data to server:\n' + failure.errorMsg);
              });
          });
        }, (failure) => {
          this.loader.dismiss();
          this.showAlert('Image upload Failed', 'Encountered following error while uploading image to server:\n' + failure.errorMsg);
        });
    });
  }

  getDateTime() {
    // https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    let currentdate = new Date();
    let fullYear = currentdate.getFullYear();
    let month = (((currentdate.getMonth()+1) < 10)? "0" : "") + (currentdate.getMonth()+1);
    let date = ((currentdate.getDate() < 10)? "0" : "") + currentdate.getDate();
    let hours = ((currentdate.getHours() < 10)? "0" : "") + currentdate.getHours();
    let minutes = ((currentdate.getMinutes() < 10)? "0" : "") + currentdate.getMinutes();
    let seconds = ((currentdate.getSeconds() < 10)? "0" : "") + currentdate.getSeconds();
    let datetime = fullYear + month + date + "_" + hours + minutes + seconds;
    return datetime;
  }

}
