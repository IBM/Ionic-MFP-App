
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
```
On Mac, you can use `brew install` for installing Maven as shown below:
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
✔ Downloading and extracting blank starter - done!

? Would you like to integrate your new app with Cordova to target native iOS and Android? Yes
✔ Personalizing ionic.config.json and package.json - done!
> ionic integrations enable cordova --quiet
✔ Downloading integration cordova - done!
✔ Copying integrations files to project - done!
[OK] Added cordova integration!

Installing dependencies may take several minutes.

  ✨   IONIC  DEVAPP  ✨

 Speed up development with the Ionic DevApp, our fast, on-device testing mobile app

  -  🔑   Test on iOS and Android without Native SDKs
  -  🚀   LiveReload for instant style and JS updates

 ️-->    Install DevApp: https://bit.ly/ionic-dev-app    <--

> npm i
✔ Running command - done!
> git init

  🔥   IONIC  PRO  🔥

 Supercharge your Ionic development with the Ionic Pro SDK

  -  ⚠️   Track runtime errors in real-time, back to your original TypeScript
  -  📲   Push remote updates and skip the app store queue

Learn more about Ionic Pro: https://ionicframework.com/products

? Install the free Ionic Pro SDK and connect your app? No

-----------------------------------

> git add -A
> git commit -m "Initial commit" --no-gpg-sign

Next Steps:
* Go to your newly created project: cd ./IonicMobileApp
* Get Ionic DevApp for easy device testing: https://bit.ly/ionic-dev-app
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


## Step 8. Update Mobile App ID, Name, Logo and Splash

### 8.1 Update App ID, Name and Description
Update `IonicMobileApp/config.xml` as below. Change `id`, `name`, `description` and `author` details appropriately.

<pre><code>
&lt;?xml version='1.0' encoding='utf-8'?&gt;
&lt;widget <b>id="org.mycity.myward"</b> version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0" xmlns:mfp="http://www.ibm.com/mobilefirst/cordova-plugin-mfp"&gt;
    <b>&lt;name&gt;My Ward - My Responsibility &lt;/name&gt;
    &lt;description&gt;Get your civic issues resolved by posting through this app.&lt;/description&gt;
    &lt;author email="shivahr@gmail.com" href="https://developer.ibm.com/code/author/shivahr/"&gt;Shiva Kumar H R&lt;/author&gt;</b>
...
</code></pre>

### 8.2 Update App Logo and Splash

Reference: Automating Icons and Splash Screens https://blog.ionic.io/automating-icons-and-splash-screens/

Copy your desired app icon to `IonicMobileApp/resources/icon.png` and app splash to `IonicMobileApp/resources/splash.png`.

```
$ cd ../IonicMobileApp
$ ionic cordova resources
```

For running `ionic cordova resources` command, you would need to sign up on ionicframework.com and specify the credentials on the command line.

## Step 6. Add pre-emptive login

### 6.4 Create login page

#### 6.4.1 Add Login UI

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

#### 6.4.2 Handle login action
Add the code for handling pre-emptive login

Update `IonicMobileApp/src/pages/login/login.ts` as below:

<pre><code>
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams<b>, AlertController</b> } from 'ionic-angular';
<b>import { FormGroup, FormControl, Validators } from '@angular/forms';</b>

@IonicPage()
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

#### 6.4.3 Show login page upon app launch

Update `IonicMobileApp/src/app/app.module.ts` as below:

<pre><code>
...
import { MyApp } from './app.component';
<b>import { LoginPageModule } from '../pages/login/login.module'</b>

@NgModule({
  <b>declarations: [
    MyApp
  ]</b>,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  <b>entryComponents: [
    MyApp
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  <b>rootPage:any = 'LoginPage';</b>

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    ...
  }
}
</code></pre>

Configure HomePage for lazy loading:

Update `IonicMobileApp/src/pages/home/home.ts` as below:

<pre><code>
import { Component } from '@angular/core';
import { <b>IonicPage,</b> NavController } from 'ionic-angular';

<b>@IonicPage()</b>
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ...
}
</code></pre>

Create file `IonicMobileApp/src/pages/home/home.module.ts` as below:

<pre><code>
<b>import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  declarations: [ HomePage ],
  imports: [ IonicPageModule.forChild(HomePage) ]
})
export class HomePageModule {}</b>
</code></pre>

### 3.2 Create Bluemix Mobile Foundation service and configure MFP CLI
* Log in to [Bluemix Dashboard](https://console.bluemix.net/) and create [*Mobile Foundation*](https://console.bluemix.net/catalog/services/mobile-foundation) service. Make a note of the admin password.

* Back on your local machine, configure MFP CLI to work with Bluemix Mobile Foundation server by running following command in console.

```
$ mfpdev server add
? Enter the name of the new server profile: Bluemix-MFP
? Enter the fully qualified URL of this server: https://mobilefoundation-71-hb-server.mybluemix.net:443
? Enter the MobileFirst Server administrator login ID: admin
? Enter the MobileFirst Server administrator password: **********
? Save the administrator password for this server?: Yes
? Enter the context root of the MobileFirst administration services: mfpadmin
? Enter the MobileFirst Server connection timeout in seconds: 30
? Make this server the default?: No
Verifying server configuration...
The following runtimes are currently installed on this server: mfp
Server profile 'Bluemix-MFP' added successfully.

$ mfpdev server info
Name         URL
--------------------------------------------------------------------------------------
Bluemix-MFP  https://mobilefoundation-71-hb-server.mybluemix.net:443        [Default]
--------------------------------------------------------------------------------------
```

### 6.1 Add Security Adapter

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

