## Note: Work in Progress

# Develop Enterprise-grade Hybrid Mobile App with Cloud-native Backend

When developing your enterprise mobile app that needs centralized hosting of data, use of cloud-native services such as [Cloudant No-SQL Database](https://www.ibm.com/cloud/cloudant) for storing textual data and [Object Storage service](https://www.ibm.com/cloud/object-storage) for storing image/video/audio data, allows you to quickly go from idea-conception to reality. The [Mobile Foundation service](https://www.ibm.com/cloud/mobile-foundation) available from IBM Cloud provides a scalable mobile access gateway for securely accessing those backend services, and it provides other essential mobile backend capabilities such as push notifications, app lifecycle management, security/authentication and app analytics.

This code pattern gives you step by step instructions for developing an [Ionic/Cordova](http://ionicframework.com/) based hybrid mobile app that securely connects to Cloudant and Object Storage services via IBM MobileFoundation (aka MFP) service.

When you have completed this pattern, you will understand:
* How to authenticate users (through pre-emptive login) using MFP security adapater.
* How to write an MFP adapter that authenticates with ObjectStorage service and passes back the X-Auth-Token to the mobile app.
* Recommended architectural patterns for coding the interaction between mobile app and ObjectStorage service.
* How to use imgCache.js in Ionic app for caching images fetched from ObjectStorage service.
* How to show Google Maps in Ionic app as well as capture user’s geo-location & image from camera.
* How to upload the captured image from mobile app to ObjectStorage service via MFP adapter.
* How to fetch data from Cloudant service to mobile app via MFP adapter as well as post new data to Cloudant.
* How to customize the Ionic app logo and splash, and build the release apk/ipa for uploading to public/private app stores.

# Flow

<img src="doc/source/images/Architecture.png" alt="Architecture diagram" width="800" border="10" />

1. User launches the mobile app, enters his/her credentials on the login screen and clicks `Login`.
2. Mobile app sends the user credentials to MFP server for validation.
3. MFP server invokes the security adapter logic to validate user credentials and returns an appropriate response to the mobile app.
4. If user authentication succeeds, mobile app proceeds to show the home page. As part of this, it makes a call to MFP adapter to fetch the data from Cloudant NoSQL database.
5. MFP adapter fetches the data from Cloudant. The data fetched will have references to the images stored in ObjectStorage.
6. MFP adapter authenticates with ObjectStorage and obtains `X-Auth-Token` and URL for ObjectStorage container.
7. MFP server returns the data fetched from Cloudant along with ObjectStorage `X-Auth-Token` to the mobile app.
8. Mobile app initializes image-caching plugin and asks it to use an HTTP header of `X-Auth-Token=<value returned from MFP adapter>` while fetching images. Mobile app displays the data obtained from MFP adapter as a list of items. The image caching plugin running on the mobile app downloads and caches images from ObjectStorage.
9. User clicks on one of the list item to see more details. A detail page is shown consisting of image and geo-location marked inside Google Maps.
10. Back in the home page, user clicks on `+` button to report a new civic problem. A new page is shown where user can enter a title/description for the new civic problem as well as capture image and geo-location of the problem spot. User clicks on `Submit` button.
11. Mobile app sends the user entered/captured data along with image & geo-location to MFP adapter, which in turn stores image in ObjectStorage and text data (along with reference to image in ObjectStorage) in Cloudant.
12. Other users who click on refresh button on the home page (and those who log in afresh) are shown the updated list of problem reports.
