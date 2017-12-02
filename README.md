## Note: This is a work in progress

# Develop Enterprise-grade Hybrid Mobile App with Cloud-native Backend

When developing your enterprise mobile app that needs centralized hosting of data, use of cloud-native services such as [Cloudant No-SQL Database](https://www.ibm.com/cloud/cloudant) for storing textual data and [Object Storage service](https://www.ibm.com/cloud/object-storage) for storing image/video/audio data, allows you to quickly go from idea-conception to reality. The [Mobile Foundation service](https://www.ibm.com/cloud/mobile-foundation) available from IBM Cloud provides a scalable mobile access gateway for securely accessing those backend services, and it provides other essential mobile backend capabilities such as push notifications, app lifecycle management, security/authentication and app analytics.

This code pattern gives you step by step instructions for developing an [Ionic/Cordova](http://ionicframework.com/) based hybrid mobile app that securely connects to Cloudant and Object Storage services via IBM MobileFoundation (aka MFP) service.

When you have completed this pattern, you will understand:
* How to do authenticate users (through pre-emptive login) using MFP security adapater.
* How to write an MFP adapter that authenticates with ObjectStorage service and passes back the X-Auth-Token to the mobile app.
* Recommended architectural patterns for coding the interaction between mobile app and ObjectStorage service.
* How to use imgCache.js in Ionic app for caching images fetched from ObjectStorage service.
* How to show Google Maps in Ionic app and, capture user’s geo-location & image from camera in Ionic app.
* How to upload the captured image from mobile app to ObjectStorage service via MFP adapter.
* How to fetch data from Cloudant service to mobile app via MFP adapter as well as post new data to Cloudant.
* How to customize the Ionic app logo and splash, and build the release apk/ipa for uploading to public/private app stores.
