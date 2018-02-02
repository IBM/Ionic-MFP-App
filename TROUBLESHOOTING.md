
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
clicking on `Get My Location` will have no effect.

Solution:

Make sure you have added following line at the end of `IonicMobileApp/platforms/android/proguard-project-mfp.txt`
```
-keep class plugin.google.maps.** { *; }
```

Related problem report that helped resolve this problem: https://github.com/mapsplugin/cordova-plugin-googlemaps/issues/1152
