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

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImgCacheModule } from 'ng-imgcache';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login'
import { HomePage } from '../pages/home/home'
import { ProblemDetailPage } from '../pages/problem-detail/problem-detail';
import { ReportNewPage } from '../pages/report-new/report-new';
import { AuthHandlerProvider } from '../providers/auth-handler/auth-handler';
import { MyWardDataProvider } from '../providers/my-ward-data/my-ward-data';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProblemDetailPage,
    ReportNewPage
  ],
  imports: [
    BrowserModule,
    ImgCacheModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ProblemDetailPage,
    ReportNewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthHandlerProvider,
    MyWardDataProvider,
    GoogleMaps,
    Camera
  ]
})
export class AppModule {}
