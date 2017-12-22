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
import { NavController, LoadingController } from 'ionic-angular';
import { ImgCacheService } from 'ng-imgcache';

import { MyWardDataProvider } from '../../providers/my-ward-data/my-ward-data';
import { ProblemDetailPage } from '../problem-detail/problem-detail';
import { ReportNewPage } from '../report-new/report-new';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loader: any;
  grievances: any;
  objectStorageAccess: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
    public myWardDataProvider: MyWardDataProvider, public imgCache: ImgCacheService) {
    console.log('--> HomePage constructor() called');
  }

  ionViewDidLoad() {
    console.log('--> HomePage ionViewDidLoad() called');
    this.refresh();
  }

  refresh() {
    this.loader = this.loadingCtrl.create({
      content: 'Loading data. Please wait ...',
    });
    this.loader.present().then(() => {
      this.myWardDataProvider.load().then(data => {
        this.myWardDataProvider.getObjectStorageAccess().then(objectStorageAccess => {
          this.objectStorageAccess = objectStorageAccess;
          this.imgCache.init({
            headers: {
              'Authorization': this.objectStorageAccess.authorizationHeader
            }
          }).then( () => {
            console.log('--> HomePage initialized imgCache');
            this.loader.dismiss();
            this.grievances = data;
          });
        });
      });
    });
  }

  // https://www.joshmorony.com/a-simple-guide-to-navigation-in-ionic-2/
  itemClick(grievance) {
    this.navCtrl.push(ProblemDetailPage, { grievance: grievance, baseUrl: this.objectStorageAccess.baseUrl });
  }

  reportNewProblem(){
    this.navCtrl.push(ReportNewPage);
  }

}
