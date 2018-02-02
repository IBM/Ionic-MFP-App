
1) Problem:

`BUILD FAILED` error during Android release build.

```
$ ionic cordova build android --prod --release
...
BUILD FAILED
...
Error: .../Ionic-MFP-App/IonicMobileApp/platforms/android/gradlew: Command failed with exit code 1 Error output:
...
Warning: okhttp3.internal.huc.DelegatingHttpsURLConnection: can't find referenced class org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
Warning: okhttp3.internal.huc.DelegatingHttpsURLConnection: can't find referenced class org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
Warning: okhttp3.internal.huc.DelegatingHttpsURLConnection: can't find referenced class org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
Warning: okhttp3.internal.huc.OkHttpsURLConnection: can't find referenced class org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
Warning: okhttp3.internal.huc.OkHttpsURLConnection: can't find referenced class org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
Warning: okhttp3.internal.huc.OkHttpsURLConnection: can't find referenced class org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
Warning: there were 6 unresolved references to classes or interfaces.
         You may need to add missing library jars or update their versions.
         If your code works fine without the missing classes, you can suppress
         the warnings with '-dontwarn' options.
         (http://proguard.sourceforge.net/manual/troubleshooting.html#unresolvedclass)

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':transformClassesAndResourcesWithProguardForRelease'.
...
[ERROR] An error occurred while running cordova build android --release (exit code 1).
```

Solution:

Make sure you have added following line at the end of `IonicMobileApp/platforms/android/proguard-project-mfp.txt`
```
-dontwarn okhttp3.internal.huc.**
```

2) Problem:

After installing the release APK, when the app is launched, an `Alert` with text 
`java.lang.NoSuchMethodException: isAvailable [class org.json.JSONArray, class org.apache.cordova.CallbackContext]` 
is thrown as shown below.

<img src="doc/source/images/ErrorAlertUponAppLaunch.png" alt="NoSuchMethodException alert when app is launched" width="240" border="10" />

If you ignore the alert and continue to run the app, you will notice that in `Problem Detail` page, 
the problem location is not marked in Google Maps. Similarly in `Report New Problem` page, 
clicking on `GET MY LOCATION` will have no effect.

Solution:

Make sure you have added following line at the end of `IonicMobileApp/platforms/android/proguard-project-mfp.txt`
```
-keep class plugin.google.maps.** { *; }
```

Related problem report that helped resolve this problem: https://github.com/mapsplugin/cordova-plugin-googlemaps/issues/1152

3) Problem:

After installing the release APK and the app is launched for the first time, trying to click on `TAKE PHOTO` button in `Report New Problem` page, crashes the app with message `Unfortunately, MyWard has stopped`.

`LogCat` shows following errors:

```
...
 D/AndroidRuntime(25220): Shutting down VM
 E/AndroidRuntime(25220): FATAL EXCEPTION: main
 E/AndroidRuntime(25220): Process: org.mycity.myward, PID: 25220
 E/AndroidRuntime(25220): java.lang.RuntimeException: Failure delivering result ResultInfo{who=@android:requestPermissions:, request=1, result=-1, data=Intent { act=android.content.pm.action.REQUEST_PERMISSIONS (has extras) }} to activity {org.mycity.myward/org.mycity.myward.MainActivity}: java.lang.NullPointerException: Attempt to invoke virtual method 'android.content.res.XmlResourceParser android.content.pm.ProviderInfo.loadXmlMetaData(android.content.pm.PackageManager, java.lang.String)' on a null object reference
 E/AndroidRuntime(25220): 	at android.app.ActivityThread.deliverResults(ActivityThread.java:5032)
 E/AndroidRuntime(25220): 	at android.app.ActivityThread.handleSendResult(ActivityThread.java:5075)
 E/AndroidRuntime(25220): 	at android.app.ActivityThread.access$1600(ActivityThread.java:229)
 E/AndroidRuntime(25220): 	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1886)
 E/AndroidRuntime(25220): 	at android.os.Handler.dispatchMessage(Handler.java:102)
 E/AndroidRuntime(25220): 	at android.os.Looper.loop(Looper.java:148)
 E/AndroidRuntime(25220): 	at android.app.ActivityThread.main(ActivityThread.java:7402)
 E/AndroidRuntime(25220): 	at java.lang.reflect.Method.invoke(Native Method)
 E/AndroidRuntime(25220): 	at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:1230)
 E/AndroidRuntime(25220): 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1120)
 E/AndroidRuntime(25220): Caused by: java.lang.NullPointerException: Attempt to invoke virtual method 'android.content.res.XmlResourceParser android.content.pm.ProviderInfo.loadXmlMetaData(android.content.pm.PackageManager, java.lang.String)' on a null object reference
 E/AndroidRuntime(25220): 	at android.support.v4.content.FileProvider.b(SourceFile:583)
 E/AndroidRuntime(25220): 	at android.support.v4.content.FileProvider.a(SourceFile:557)
 E/AndroidRuntime(25220): 	at android.support.v4.content.FileProvider.a(SourceFile:399)
 E/AndroidRuntime(25220): 	at org.apache.cordova.camera.CameraLauncher.takePicture(SourceFile:295)
 E/AndroidRuntime(25220): 	at org.apache.cordova.camera.CameraLauncher.onRequestPermissionResult(SourceFile:1315)
 E/AndroidRuntime(25220): 	at org.apache.cordova.CordovaInterfaceImpl.onRequestPermissionResult(SourceFile:214)
 E/AndroidRuntime(25220): 	at org.apache.cordova.CordovaActivity.onRequestPermissionsResult(SourceFile:508)
 E/AndroidRuntime(25220): 	at android.app.Activity.dispatchRequestPermissionsResult(Activity.java:7291)
 E/AndroidRuntime(25220): 	at android.app.Activity.dispatchActivityResult(Activity.java:7169)
 E/AndroidRuntime(25220): 	at android.app.ActivityThread.deliverResults(ActivityThread.java:5028)
 E/AndroidRuntime(25220): 	... 9 more
 E/com.worklight.common.a$f(25220): a$f.uncaughtException in SourceFile:449 :: Uncaught Exception
 E/com.worklight.common.a$f(25220): java.lang.RuntimeException: Failure delivering result ResultInfo{who=@android:requestPermissions:, request=1, result=-1, data=Intent { act=android.content.pm.action.REQUEST_PERMISSIONS (has extras) }} to activity {org.mycity.myward/org.mycity.myward.MainActivity}: java.lang.NullPointerException: Attempt to invoke virtual method 'android.content.res.XmlResourceParser android.content.pm.ProviderInfo.loadXmlMetaData(android.content.pm.PackageManager, java.lang.String)' on a null object reference
 E/com.worklight.common.a$f(25220): 	at android.app.ActivityThread.deliverResults(ActivityThread.java:5032)
 E/com.worklight.common.a$f(25220): 	at android.app.ActivityThread.handleSendResult(ActivityThread.java:5075)
 E/com.worklight.common.a$f(25220): 	at android.app.ActivityThread.access$1600(ActivityThread.java:229)
 E/com.worklight.common.a$f(25220): 	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1886)
 E/com.worklight.common.a$f(25220): 	at android.os.Handler.dispatchMessage(Handler.java:102)
 E/com.worklight.common.a$f(25220): 	at android.os.Looper.loop(Looper.java:148)
 E/com.worklight.common.a$f(25220): 	at android.app.ActivityThread.main(ActivityThread.java:7402)
 E/com.worklight.common.a$f(25220): 	at java.lang.reflect.Method.invoke(Native Method)
 E/com.worklight.common.a$f(25220): 	at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:1230)
 E/com.worklight.common.a$f(25220): 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1120)
 E/com.worklight.common.a$f(25220): Caused by: java.lang.NullPointerException: Attempt to invoke virtual method 'android.content.res.XmlResourceParser android.content.pm.ProviderInfo.loadXmlMetaData(android.content.pm.PackageManager, java.lang.String)' on a null object reference
 E/com.worklight.common.a$f(25220): 	at android.support.v4.content.FileProvider.b(SourceFile:583)
 E/com.worklight.common.a$f(25220): 	at android.support.v4.content.FileProvider.a(SourceFile:557)
 E/com.worklight.common.a$f(25220): 	at android.support.v4.content.FileProvider.a(SourceFile:399)
 E/com.worklight.common.a$f(25220): 	at org.apache.cordova.camera.CameraLauncher.takePicture(SourceFile:295)
 E/com.worklight.common.a$f(25220): 	at org.apache.cordova.camera.CameraLauncher.onRequestPermissionResult(SourceFile:1315)
 E/com.worklight.common.a$f(25220): 	at org.apache.cordova.CordovaInterfaceImpl.onRequestPermissionResult(SourceFile:214)
 E/com.worklight.common.a$f(25220): 	at org.apache.cordova.CordovaActivity.onRequestPermissionsResult(SourceFile:508)
 E/com.worklight.common.a$f(25220): 	at android.app.Activity.dispatchRequestPermissionsResult(Activity.java:7291)
 E/com.worklight.common.a$f(25220): 	at android.app.Activity.dispatchActivityResult(Activity.java:7169)
 E/com.worklight.common.a$f(25220): 	at android.app.ActivityThread.deliverResults(ActivityThread.java:5028)
 E/com.worklight.common.a$f(25220): 	... 9 more
 W/CursorWrapperInner(25220): Cursor finalized without prior close()
 I/Process(25220): Sending signal. PID: 25220 SIG: 9
```

Reference: https://stackoverflow.com/questions/45938239/cordova-and-proguard-camera-plugin-npe-on-takepicture

Solution:

Edit `IonicMobileApp/config.xml` and add the following tag inside the `<platform name="android">` tag:
```
  <preference name="applicationId" value="org.mycity.myward" />
```
