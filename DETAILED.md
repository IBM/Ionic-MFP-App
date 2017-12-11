## Steps
1. [Setup Ionic and MFP CLI](#step-1-setup-ionic-and-mfp-cli)
2. [Create Ionic Sample Application](#step-2-create-ionic-sample-application)
  - 2.1 [Create a new Ionic project](#21-create-a-new-ionic-project)
  - 2.2 [Start a local dev server for app dev/testing](#22-start-a-local-dev-server-for-app-devtesting)
  - 2.3 [Update App ID, Name and Description](#23-update-app-id-name-and-description)
  - 2.4 [Run application on Android phone](#24-run-application-on-android-phone)
    - 2.4.1 [Install Android Studio and Android SDK platform](#241-install-android-studio-and-android-sdk-platform)
    - 2.4.2 [Enable developer options and USB debugging on your Android phone](#242-enable-developer-options-and-usb-debugging-on-your-android-phone)
    - 2.4.3 [Enable Android platform for Ionic application](#243-enable-android-platform-for-ionic-application)
    - 2.4.4 [Build/Run the Ionic application on Android phone](#244-buildrun-the-ionic-application-on-android-phone)
  - 2.5 [Update App Logo and Splash](#25-update-app-logo-and-splash)
  - 2.6 [Fix issue where you see a blank screen after your splash screen disappears](#26-fix-issue-where-you-see-a-blank-screen-after-your-splash-screen-disappears)
3. [Add pre-emptive login](#step-3-add-pre-emptive-login)
  - 3.1 [Create login page](#31-create-login-page)
    - 3.1.1 [Add Login UI](#311-add-login-ui)
    - 3.1.2 [Handle login action](#312-handle-login-action)
    - 3.1.3 [Show login page upon app launch](#313-show-login-page-upon-app-launch)
  - 3.2 [Create Mobile Foundation service and configure MFP CLI](#32-create-mobile-foundation-service-and-configure-mfp-cli)
  - 3.3 [Add MFP Security Adapter](#33-add-mfp-security-adapter)
  - 3.4 [Add the Cordova plugin for MFP](#34-add-the-cordova-plugin-for-mfp)
  - 3.5 [Register the app to MobileFirst Server](#35-register-the-app-to-mobilefirst-server)
  - 3.6 [Create a new provider in Ionic mobile app to assist in handling MFP security challenges](#36-create-a-new-provider-in-ionic-mobile-app-to-assist-in-handling-mfp-security-challenges)
  - 3.7 [Initialize AuthHandler after MobileFirst SDK is loaded](#37-initialize-authhandler-after-mobilefirst-sdk-is-loaded)
  - 3.8 [Update Login controller to use MFP based user authentication](#38-update-login-controller-to-use-mfp-based-user-authentication)
4. [Fetch data from Cloudant database via MFP Adapter](#step-4-fetch-data-from-cloudant-database-via-mfp-adapter)
  - 4.1 [Create Cloudant database and populate it with sample data](#41-create-cloudant-database-and-populate-it-with-sample-data)
  - 4.2 [Create MFP adapter to query Cloudant data](#42-create-mfp-adapter-to-query-cloudant-data)
    - 4.2.1 [Download sample MFP Java adapter for Cloudant](#421-download-sample-mfp-java-adapter-for-cloudant)
    - 4.2.2 [Point the MFP adapter to your Cloudant service instance](#422-point-the-mfp-adapter-to-your-cloudant-service-instance)


## Step 1. Setup Ionic and MFP CLI
* Install Node.js by downloading the setup from https://nodejs.org/en/ (Node.js 8.x or above)
```
$ node --version
v8.6.0
```

* Install Cordova
```
$ sudo npm install -g cordova
$ cordova --version
7.0.1
```

**Note**: If you are on Windows, instead of using sudo, run the above command (and the ones below) in a command prompt opened in administrative mode.

* Install Ionic
```
$ sudo npm install -g ionic
$ ionic --version
3.19.0
```

* Install IBM MobileFirst Platform CLI
```
$ sudo npm install -g mfpdev-cli
$ mfpdev --version
8.0.0-2017091111
```

* Install GIT https://git-scm.com/downloads
```
$ git --version
git version 2.9.3 ...
```

* Install Maven:
On Mac, you can use `brew install` for installing Maven as shown below:
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install maven
$ mvn --version
Apache Maven 3.5.0 ...
```

* Install Java SDK from http://www.oracle.com/technetwork/java/javase/downloads/index.html
```
$ java -version
java version "1.8.0_101"
```

* Install an IDE for JavaScript/TypeScript such as Atom on Mac.

  Install TypeScript plugin for Atom
```
apm install atom-typescript
```

## Step 2. Create Ionic Sample Application

### 2.1 Create a new Ionic project

Create a new Ionic project with blank starter template
```
$ ionic start IonicMobileApp blank
✔ Creating directory ./IonicMobileApp - done!
...
? Would you like to integrate your new app with Cordova to target native iOS and Android? Yes
...
> npm i
...
> git init

? Install the free Ionic Pro SDK and connect your app? No
...
> git add -A
> git commit -m "Initial commit" --no-gpg-sign
...
```

Change directory to the newly created project:
```
$ cd ./IonicMobileApp
```

### 2.2 Start a local dev server for app dev/testing

To get a preview of the application, Ionic/Cordova provides a feature by the which the application can be launched in a browser by using the `cordova serve` or `ionic serve` as shown below:
```
$ ionic serve -c
[INFO] Starting app-scripts server: --address 0.0.0.0 --port 8100 
       --livereload-port 35729 --dev-logger-port 53703 --consolelogs --nobrowser - Ctrl+C to cancel
[17:20:10]  watch started ... 
[17:20:10]  build dev started ... 
[17:20:10]  clean started ... 
[17:20:10]  clean finished in 1 ms 
[17:20:10]  copy started ... 
[17:20:10]  deeplinks started ... 
[17:20:10]  deeplinks finished in 22 ms 
[17:20:10]  transpile started ... 
[17:20:13]  transpile finished in 3.58 s 
[17:20:13]  preprocess started ... 
[17:20:14]  copy finished in 3.83 s 
[17:20:14]  preprocess finished in 185 ms 
[17:20:14]  webpack started ... 
[17:20:21]  webpack finished in 7.48 s 
[17:20:21]  sass started ... 
[17:20:22]  sass finished in 1.01 s 
[17:20:22]  postprocess started ... 
[17:20:22]  postprocess finished in 5 ms 
[17:20:22]  lint started ... 
[17:20:22]  build dev finished in 12.36 s 
[17:20:22]  watch ready in 12.42 s 
[17:20:22]  dev server running: http://localhost:8100/ 

[INFO] Development server running!
       Local: http://localhost:8100
       External: http://192.xxx.xxx.xxx:8100, http://9.xxx.xxx.xxx:8100
       DevApp: IonicMobileApp@8100 on shivahr
```

The above command also launches the Cordova [live-reload](https://www.npmjs.com/package/cordova-plugin-browsersync) workflow. The live-reload feature watches for changes in your source files and automatically builds the project and reloads the application in browser.

Since the `ionic serve` command continues to run in foreground, to be able to run further Cordova/Ionic commands open a new terminal and change directory to the project.


### 2.3 Update App ID, Name and Description
Update `IonicMobileApp/config.xml` as below. Change `id`, `name`, `description` and `author` details appropriately.

<pre><code>
&lt;?xml version='1.0' encoding='utf-8'?&gt;
&lt;widget <b>id="org.mycity.myward"</b> version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0" xmlns:mfp="http://www.ibm.com/mobilefirst/cordova-plugin-mfp"&gt;
    <b>&lt;name&gt;MyWard&lt;/name&gt;
    &lt;description&gt;Get your civic issues resolved by posting through this app.&lt;/description&gt;
    &lt;author email="shivahr@gmail.com" href="https://developer.ibm.com/code/author/shivahr/"&gt;Shiva Kumar H R&lt;/author&gt;</b>
...
</code></pre>

### 2.4 Run application on Android phone

#### 2.4.1 Install Android Studio and Android SDK platform
* Download and install Android Studio from https://developer.android.com/studio/index.html
* Install Android SDK Platform 23 (or higher)
  - Launch Android Studio.
  - Click on *Configure* -> *SDK Manager*
  - Under *SDK Platforms*, select *Android 6.0 (Marshmallow) API Level 23*. Click *Apply* and then click *OK*. This will install Android SDK Platform on your machine.
 
#### 2.4.2 Enable developer options and USB debugging on your Android phone
* Enable USB debugging on your Android phone as per the steps in https://developer.android.com/studio/debug/dev-options.html
  - Launch the Settings app on your phone. Select *About Device* -> *Software Info* . Tap *Build number* 7 times to enable developer options.
  - Return to Settings list. Select *Developer options* and enable *USB debugging*.
* If you are developing on Windows, then you need to install the appropriate USB driver as per instructions in https://developer.android.com/studio/run/oem-usb.html.
* Connect the Android phone to your development machine by USB cable, and accept *allow* access on your phone.

#### 2.4.3 Enable Android platform for Ionic application

* Add [Cordova platform for Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/)
```
$ ionic cordova platform add android@6.3.0
> cordova platform add android@6.3.0 --save
...
```

  Note: Make sure the Cordova platform version being added is supported by the MobileFirst plug-ins. Site https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/application-development/sdk/cordova/ lists the supported levels.
```
$ cordova platform version
Installed platforms:
  android 6.3.0
Available platforms: 
  blackberry10 ~3.8.0 (deprecated)
  browser ~4.1.0
  ios ~4.4.0
  osx ~4.0.1
  webos ~3.7.0
```

[Cordova Android 6.3.0](https://cordova.apache.org/announcements/2017/09/27/android-release.html) targets the latest Android API level of API 26. If you want to [target API 23 instead](https://stackoverflow.com/questions/35573485/ionic-add-platform-android-with-custom-android-target), then edit `IonicMobileApp/config.xml` and add preference for `android-targetSdkVersion` as shown below.
```
  <preference name="android-minSdkVersion" value="16" />
  <preference name="android-targetSdkVersion" value="23" />
```

#### 2.4.4 Build/Run the Ionic application on Android phone

* Build Android application
```
$ ionic cordova build android
```

* Run application on Android device
```
$ ionic cordova run android
```

<img src="doc/source/images/SampleIonicAppRunningOnAndroid.png" alt="Snapshot of app running on Android device" width="240" border="10" />


### 2.5 Update App Logo and Splash

Reference: Automating Icons and Splash Screens https://blog.ionic.io/automating-icons-and-splash-screens/

Copy your desired app icon to `IonicMobileApp/resources/icon.png` and app splash to `IonicMobileApp/resources/splash.png`.

```
$ cd ../IonicMobileApp
$ ionic cordova resources
```

For running `ionic cordova resources` command, you would need to sign up on ionicframework.com and specify the credentials on the command line.

### 2.6 Fix issue where you see a blank screen after your splash screen disappears

Reference: http://www.codingandclimbing.co.uk/blog/ionic-2-fix-splash-screen-white-screen-issue

Update `IonicMobileApp/config.xml` as below:
<pre><code>
...
&lt;widget id=...&gt;
  &lt;preference name="SplashScreenDelay" value="3000" /&gt;
  <b>&lt;preference name="AutoHideSplashScreen" value="false" /&gt;
  &lt;preference name="FadeSplashScreen" value="false" /&gt;</b>
  ...
</code></pre>

Update `IonicMobileApp/src/app/app.component.ts` as below:
<pre><code>
...
export class MyApp {
  ...
    platform.ready().then(() => {
      ...
      statusBar.styleDefault();
      <b>setTimeout(() => {
        splashScreen.hide();
      }, 100);</b>
    });
  }
}
</code></pre>


## Step 3. Add pre-emptive login

### 3.1 Create login page

#### 3.1.1 Add Login UI

```
$ ionic generate page login
[OK] Generated a page named login!
```

Update `IonicMobileApp/src/pages/login/login.html` as below:

<pre><code>
&lt;ion-header&gt;
  &lt;ion-navbar&gt;
    &lt;ion-title&gt;<b>Login</b>&lt;/ion-title&gt;
  &lt;/ion-navbar&gt;
&lt;/ion-header&gt;

&lt;ion-content&gt;
  <b>&lt;form (submit)="processForm()" [formGroup]="form"&gt;
    &lt;ion-list&gt;
      &lt;ion-item&gt;
        &lt;ion-label fixed&gt;Username&lt;/ion-label&gt;
        &lt;ion-input formControlName="username" type="text"&gt;&lt;/ion-input&gt;
      &lt;/ion-item&gt;
      &lt;ion-item&gt;
        &lt;ion-label fixed&gt;Password&lt;/ion-label&gt;
        &lt;ion-input formControlName="password" type="password"&gt;&lt;/ion-input&gt;
      &lt;/ion-item&gt;
    &lt;/ion-list&gt;
    &lt;div padding&gt;
      &lt;button ion-button block type="submit"&gt;Sign In&lt;/button&gt;
    &lt;/div&gt;
  &lt;/form&gt;</b>
&lt;/ion-content&gt;
</code></pre>

#### 3.1.2 Handle login action
Add the code for handling pre-emptive login

Update `IonicMobileApp/src/pages/login/login.ts` as below:

<pre><code>
import { Component } from '@angular/core';
import { NavController, NavParams<b>, AlertController</b> } from 'ionic-angular';
<b>import { FormGroup, FormControl, Validators } from '@angular/forms';</b>

<b> // @IonicPage() </b>
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  <b>form;</b>

  constructor(public navCtrl: NavController, public navParams: NavParams<b>,
      public alertCtrl: AlertController</b>) {
    <b>console.log('--> LoginPage constructor() called');
    this.form = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });</b>
  }

  <b>processForm() {
    // Reference: https://github.com/driftyco/ionic-preview-app/blob/master/src/pages/inputs/basic/pages.ts
    let username = this.form.value.username;
    let password = this.form.value.password;
    if (username === "" || password === "") {
      this.showAlert('Login Failure', 'Username and password are required');
      return;
    }
    console.log('--> Sign-in with user: ' + username);
    this.showAlert('Login', 'Signing-in as ' + username);
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
  }</b>

  ionViewDidLoad() {
    console.log(<b>'--> LoginPage ionViewDidLoad() called'</b>);
  }

}
</code></pre>

#### 3.1.3 Show login page upon app launch

Update `IonicMobileApp/src/app/app.module.ts` as below:

<pre><code>
...
import { MyApp } from './app.component';
<b>import { LoginPage } from '../pages/login/login'</b>
import { HomePage } from '../pages/home/home'

@NgModule({
  <b>declarations: [
    MyApp,
    <b>LoginPage,</b>
    HomePage
  ]</b>,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  <b>entryComponents: [
    MyApp
    <b>LoginPage,</b>
    HomePage
  ]</b>,
  providers: [
    ...
  ]
})
export class AppModule {}
</code></pre>

Update `IonicMobileApp/src/app/app.component.ts` as below:

<pre><code>
...
import { SplashScreen } from '@ionic-native/splash-screen';
import { <b>LoginPage</b> } from '<b>../pages/login/login</b>'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  <b>rootPage:any = LoginPage;</b>

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    ...
  }
}
</code></pre>

### 3.2 Create Mobile Foundation service and configure MFP CLI
* Log in to [IBM Cloud Dashboard](https://console.bluemix.net/) and create [*Mobile Foundation*](https://console.bluemix.net/catalog/services/mobile-foundation) service. Make a note of the admin password.

* Back on your local machine, configure MFP CLI to work with Mobile Foundation server by running following command in console.

```
$ mfpdev server add
? Enter the name of the new server profile: Cloud-MFP
? Enter the fully qualified URL of this server: https://mobilefoundation-71-hb-server.mybluemix.net:443
? Enter the MobileFirst Server administrator login ID: admin
? Enter the MobileFirst Server administrator password: **********
? Save the administrator password for this server?: Yes
? Enter the context root of the MobileFirst administration services: mfpadmin
? Enter the MobileFirst Server connection timeout in seconds: 30
? Make this server the default?: No
Verifying server configuration...
The following runtimes are currently installed on this server: mfp
Server profile 'Cloud-MFP' added successfully.

$ mfpdev server info
Name         URL
--------------------------------------------------------------------------------------
Cloud-MFP  https://mobilefoundation-71-hb-server.mybluemix.net:443        [Default]
--------------------------------------------------------------------------------------
```

### 3.3 Add MFP Security Adapter

https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/authentication-and-security/user-authentication/security-check/

Create directory for MFP Adapters
```
$ cd ..
$ mkdir MobileFoundationAdapters
$ cd MobileFoundationAdapters
```

Download UserLogin adapter from https://github.com/MobileFirst-Platform-Developer-Center/SecurityCheckAdapters/tree/release80/UserLogin
```
$ curl -LOk https://github.com/MobileFirst-Platform-Developer-Center/SecurityCheckAdapters/archive/release80.zip
$ unzip release80.zip
$ mv SecurityCheckAdapters-release80/UserLogin/ .
$ rm -rf SecurityCheckAdapters-release80/ release80.zip
$ ls
UserLogin
```

Build and deploy the UserLogin sample adapter
```
$ cd ./UserLogin
$ mfpdev adapter build
Building adapter...
Successfully built adapter

$ mfpdev adapter deploy
Verifying server configuration...
Deploying adapter to runtime mfp on https://mobilefoundation-71-hb-server.mybluemix.net:443/mfpadmin...
Successfully deployed adapter
```

### 3.4 Add the Cordova plugin for MFP

Make sure you have enabled Android/iOS platform for the Ionic application as mentioned in [Step 2.4.3](#243-enable-android-platform-for-ionic-application) before continuing with the below steps.

  Add Cordova plugin for MFP as shown below.
```
$ cd ../../IonicMobileApp/
$ cordova plugin add cordova-plugin-mfp
Installing "cordova-plugin-mfp" for android
...
```

### 3.5 Register the app to MobileFirst Server
```
$ mfpdev app register
Verifying server configuration...
Registering to server:'https://mobilefoundation-71-hb-server.mybluemix.net:443' runtime:'mfp'
Updated config.xml file located at: .../Ionic-MFP-App/IonicMobileApp/config.xml
Run 'cordova prepare' to propagate changes.
Registered app for platform: android
```

  Propogate changes by running `cordova prepare`
```
$ cordova prepare
```

### 3.6 Create a new provider in Ionic mobile app to assist in handling MFP security challenges

Generate a new provider using Ionic CLI

```
$ ionic generate provider AuthHandler
[OK] Generated a provider named AuthHandler!
```

Update `IonicMobileApp/src/providers/auth-handler.ts` as below:

<pre><code>
/// <b>&lt;reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" /&gt;</b>
import { Injectable } from '@angular/core';

<b>var isChallenged = false;
var handleChallengeCallback = null;
var loginSuccessCallback = null;
var loginFailureCallback = null;</b>

@Injectable()
export class AuthHandlerProvider {
  <b>securityCheckName = 'UserLogin';
  userLoginChallengeHandler;
  initialized = false;</b>

  constructor() {
    <b>console.log('--> AuthHandlerProvider constructor() called');</b>
  }

  <b>// Reference: https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/authentication-and-security/credentials-validation/javascript/
  init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    console.log('--> AuthHandler init() called');

    this.userLoginChallengeHandler = WL.Client.createSecurityCheckChallengeHandler(this.securityCheckName);

    this.userLoginChallengeHandler.handleChallenge = function(challenge) {
      console.log('--> AuthHandler handleChallenge called');
      isChallenged = true;

      console.log('--> remainingAttempts: ', challenge.remainingAttempts);
      var statusMsg = 'Remaining attempts: ' + challenge.remainingAttempts;
      if (challenge.errorMsg !== null) {
        console.log('--> errorMsg: ', challenge.errorMsg);
        statusMsg += '<br>' + challenge.errorMsg;
        if (loginFailureCallback != null) {
          loginFailureCallback(statusMsg);
        }
      }

      if (handleChallengeCallback != null) {
        handleChallengeCallback();
      } else {
        console.log('--> handleChallengeCallback not set!');
      }
    };

    this.userLoginChallengeHandler.handleSuccess = function(data) {
      console.log('--> AuthHandler handleSuccess called');
      isChallenged = false;

      if (loginSuccessCallback != null) {
        loginSuccessCallback();
      } else {
        console.log('--> loginSuccessCallback not set!');
      }
    };

    this.userLoginChallengeHandler.handleFailure = function(error) {
      console.log('--> AuthHandler handleFailure called' + error.failure);
      isChallenged = false;

      if (loginFailureCallback != null) {
        loginFailureCallback(error.failure);
      } else {
        console.log('--> loginFailureCallback not set!');
      }
    };
  }

  setCallbacks(onSuccess, onFailure, onHandleChallenge) {
    console.log('--> AuthHandler setCallbacks called');
    loginSuccessCallback = onSuccess;
    loginFailureCallback = onFailure;
    handleChallengeCallback = onHandleChallenge;
  }

  // Reference: https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/authentication-and-security/user-authentication/javascript/
  checkIsLoggedIn() {
    console.log('--> AuthHandler checkIsLoggedIn called');
    WLAuthorizationManager.obtainAccessToken('UserLogin')
    .then(
      (accessToken) => {
        console.log('--> obtainAccessToken onSuccess');
      },
      (error) => {
        console.log('--> obtainAccessToken onFailure: ' + JSON.stringify(error));
      }
    );
  }

  login(username, password) {
    console.log('--> AuthHandler login called');
    console.log('--> isChallenged: ', isChallenged);
    if (isChallenged) {
      this.userLoginChallengeHandler.submitChallengeAnswer({'username':username, 'password':password});
    } else {
      WLAuthorizationManager.login(this.securityCheckName, {'username':username, 'password':password})
      .then(
        (success) => {
          console.log('--> login success');
        },
        (failure) => {
          console.log('--> login failure: ' + JSON.stringify(failure));
          loginFailureCallback(failure.errorMsg);
        }
      );
    }
  }

  logout() {
    console.log('--> AuthHandler logout called');
    WLAuthorizationManager.logout(this.securityCheckName)
    .then(
      (success) => {
        console.log('--> logout success');
      },
      (failure) => {
        console.log('--> logout failure: ' + JSON.stringify(failure));
      }
    );
  }</b>
}
</code></pre>


### 3.7 Initialize AuthHandler after MobileFirst SDK is loaded

Update `IonicMobileApp/src/app/app.component.ts` as below:

<pre><code>
import { Component<b>, Renderer</b> } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login'
<b>import { AuthHandlerProvider } from '../providers/auth-handler/auth-handler';</b>

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen<b>,
    renderer: Renderer, private authHandler: AuthHandlerProvider</b>) {
    <b>console.log('--> MyApp constructor() called');

    renderer.listenGlobal('document', 'mfpjsloaded', () => {
      console.log('--> MyApp mfpjsloaded');
      this.authHandler.init();
    })</b>

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      <b>console.log('--> MyApp platform.ready() called');</b>
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}
</code></pre>

### 3.8 Update Login controller to use MFP based user authentication
Add the code for handling pre-emptive login

Update `IonicMobileApp/src/pages/login/login.ts` as below:

<pre><code>
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController<b>, LoadingController</b> } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

<b>import { AuthHandlerProvider } from '../../providers/auth-handler/auth-handler';
import { HomePage } from '../home/home';</b>

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form;
  <b>loader: any;</b>

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public alertCtrl: AlertController<b>, public authHandler:AuthHandlerProvider, public loadingCtrl: LoadingController</b>) {
    console.log('--> LoginPage constructor() called');

    this.form = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });

    <b>this.authHandler.setCallbacks(
      () =>  {
        this.loader.dismiss();
        let view = this.navCtrl.getActive();
        if (!(view.instance instanceof HomePage )) {
          this.navCtrl.setRoot(HomePage);
        }
      }, (error) => {
        this.loader.dismiss();
        if (error !== null) {
          this.showAlert('Login Failure', error);
        } else {
          this.showAlert('Login Failure', 'Failed to login.');
        }
      }, () => {
        // this.navCtrl.setRoot(Login);
      });</b>
  }

  processForm() {
    // Reference: https://github.com/driftyco/ionic-preview-app/blob/master/src/pages/inputs/basic/pages.ts
    let username = this.form.value.username;
    let password = this.form.value.password;
    if (username === "" || password === "") {
      this.showAlert('Login Failure', 'Username and password are required');
      return;
    }
    console.log('--> Sign-in with user: ', username);
    <b>this.loader = this.loadingCtrl.create({
      content: 'Signining in. Please wait ...',
    });
    this.loader.present().then(() => {
      this.authHandler.login(username, password);
    });</b>
  }

  showAlert(alertTitle, alertMessage) {
    ...
  }

  ionViewDidLoad() {
    ...
  }

}
</code></pre>


Install the StatusBar plugin
```
$ ionic cordova plugin add cordova-plugin-statusbar
> cordova plugin add cordova-plugin-statusbar --save
Installing "cordova-plugin-statusbar" for android
```

## Step 4. Fetch data from Cloudant database via MFP Adapter

### 4.1 Create Cloudant database and populate it with sample data

* Log in to [IBM Cloud Dashboard](https://console.bluemix.net/) and create [*Cloudant NoSQL DB*](https://console.bluemix.net/catalog/services/cloudant-nosql-db) service.
* From the welcome page of Cloudant service that you just created, launch the Cloudant Dashboard.
* In the Cloudant dashboard, click on *Databases*.
* Click on *Create Database*. Specify name of database as `myward` as shown below. Click *Create*.

<img src="doc/source/images/CreateCloudantDatabase.png" alt="Create Database in Cloudant NoSQL DB" width="800" border="10" />

Once the database is created, the dashboard will update to show the documents inside `myward` database (which, as expected, will be empty to begin with).

* Click *Create Document*. Under document content, after the auto populated `_id` field, enter grievance details as shown below.

```
{
  "_id": "7fc63023799dfda9582609e75127b4fa",
  "reportedBy": "shivahr@gmail.com",
  "reportedDateTime": "20171125_152627",
  "picture": {
    "large": "IMG-20171125-WA0012.jpeg",
    "thumbnail": "thumbnail_IMG-20171125-WA0012.jpg"
  },
  "problemDescription": "Car parking on busy market road chocking movement of other vehicles and pedestrians",
  "geoLocation": {
    "type": "Point",
    "coordinates": [
      77.7893168,
      13.0773568
    ]
  },
  "address": "Basaveshwara Temple road (behind Market Road), Hosakote, Bangalore 562114"
}
```

Click *Create Document* to create/save the document.

* Repeat the above steps and create documents for the remaining grievances as shown in [SampleData/MyWardGrievances.json](SampleData/MyWardGrievances.json).

### 4.2 Create MFP adapter to query Cloudant data

Reference: https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/adapters/cloudant/#java-adapters

#### 4.2.1 Download sample MFP Java adapter for Cloudant
Download MFP Java adapter for Cloudant from https://github.com/MobileFirst-Platform-Developer-Center/CloudantAdapter/tree/release80/Adapters/CloudantJava

```
$ cd ../MobileFoundationAdapters/
$ curl -LOk https://github.com/MobileFirst-Platform-Developer-Center/CloudantAdapter/archive/release80.zip
$ unzip release80.zip
$ mv CloudantAdapter-release80/Adapters/CloudantJava/ ./MyWardData
$ rm -rf CloudantAdapter-release80/ release80.zip
$ ls
MyWardData	UserLogin
```

#### 4.2.2 Point the MFP adapter to your Cloudant service instance

Generate Cloudant API Key
 * In the Cloudant dashboard, under `my ward` database, click on *Permissions* and then click on *Generate API Key* as shown in the snapshot below.
 * Make a note of the Key and Password generated.
 * The newly added key would get listed under Cloudant users with default permission of *reader* only. Select the checkbox under *writer* next to the new key to give it write permission as well.

  <img src="doc/source/images/CloudantGenerateAPIKey.png" alt="Generate Cloudant API Key" width="800" border="10" />

Specify Cloudant credentials in MFP adapter
 * Open `MobileFoundationAdapters/MyWardData/src/main/adapter-resources/adapter.xml` and update the properties `key` and `password` as per the newly generated API key.
 * For property `account`, specify the Cloudant dashboard URL portion after *https://* and upto (and including) *-bluemix.cloudant.com* as shown in snapshot above.
 * For property `DBName`, specify value `myward`.

