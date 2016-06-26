/**
 * Created by philmerrell on 3/21/16.
 * This service wraps the phonegap-plugin-push plugin and is only a parital implementation of the
 * plugin.  Other methods such as adding and removing badges in addition to unregistering can be
 * viewed in the original documentation and added as needed.
 * https://github.com/phonegap/phonegap-plugin-push
 *
 *
 * Push Notification Factory
 * @namespace Factories
 *
 */


(function() {
  'use strict';

  angular
    .module('tawks.services')
    .factory('PushNotificationService', PushNotificationService);


  /**
   *
   * @param $cordovaDialogs
   * @param $http
   * @param $q
   * @param $rootScope
   * @param $timeout
   * @param EnvironmentService
   * @returns {{attachErrorListener: attachErrorListener, attachNotificationListener: attachNotificationListener, compareRegIds: compareRegIds, createRegObj: createRegObj, init: init, postRegIdToApi: postRegIdToApi, register: register}}
   * @constructor
   */
  function PushNotificationService($http, $q, $timeout) {
    /*global PushNotification*/

    var env = '';
    var push;
    var options = {
      "android": { "senderID": "347198189088" },
      "ios": { "alert": true, "badge": true, "sound": true }
    };

    var service = {
      attachErrorListener         : attachErrorListener,
      attachNotificationListener  : attachNotificationListener,
      compareRegIds               : compareRegIds,
      createRegObj                : createRegObj,
      init                        : init,
      postRegIdToApi              : postRegIdToApi,
      register                    : register
    };

    return service;



    ////////////////////////////////////

    function attachErrorListener() {
      $timeout(function () {
        push.on('error', function (error) {
          console.log(new Error(error));
        });
      });
    }

    /**
     * @name addNotificationListener
     * @desc This method simply alerts the user when a notification is received while using the application.
     * It is unnecessary to receive notifications when the app is not in use.
     */
    function attachNotificationListener() {
      $timeout(function() {
        push.on('notification', function(notification) {
          winow.alert(notifcation.message);
          // TODO:
        });
      });
    }

    /**
     * @name compareRegIds
     * @desc This method compares registration Ids to determine if a new platform endpoint needs to
     * be created for the user's device.  If a savedRegId exists (because they have already registered
     * for push notifications) and it is the same as the newRegId, then we can prevent the app from
     * posting to the 'api/pushnotifications' endpoint to register a new endpoint.
     * @param savedRegId
     * @param newRegId
     */
    function compareRegIds(savedRegId, newRegId) {
      if(savedRegId !== newRegId) {
        var regObj = service.createRegObj(newRegId);
        service.postRegIdToApi(regObj);
      }
    }

    /**
     * @desc This method creates a registration object to post to the 'api/pushnotifications' endpoint.
     * The object consists of a registration token from a mobile device and the platform type as detected.
     * @param regId
     * @returns {{token: *}}
     */
    function createRegObj(regId) {
      var regObj = {token: regId};
      if(ionic.Platform.isAndroid()) {
        regObj.platformType = 'android';
      } else if (ionic.Platform.isIOS()){
        regObj.platformType = 'ios';
      }

      return regObj;
    }

    /**
     * @name init
     * @desc This method initializes push notifications for the mobile app.  It starts by initializing push
     * notifications on a user's device and calls the registration method, which asks the user if they wish
     * to receive push notifications. When the a device token comes back it is stored in localStorage and
     * then sent to a compare method.
     * @returns {HttpPromise}
     */
    function init() {
      var q = $q.defer();
      push = PushNotification.init(options);
      q.resolve(push);
      return q.promise.then(function() {
        return service.register().then(function() {
          //service.attachNotificationListener();
          //service.attachErrorListener();
        });
      });
    }

    /**
     * @desc Posts a registration object (see createRegObj method) to myBoiseState api so a user will
     * be registered and able to receive push notifications from Boise State University.  Once the result
     * is received from the api, values are saved to localStorage in order to prevent unnecessary posting
     * to the 'api/pushnotification' endpoint.  The userPushId is saved locally so that after a user
     * logs in, we can associate their emplid with their device for targeted push notifications.
     *
     * @param regObj
     * @returns {*}
     */
    function postRegIdToApi(regObj) {

      return $http.get('https://tawks.azurewebsites.net/account/registerdevicetoken?token='+regObj).then(function(result) {

      });
c
    }

    /**
     * @desc This method is crucial for receiving a push notification registration id from a user's
     * device. It listens for the registration event and passes the returned registration Id to the
     * service compare method.
     * @returns {*}
     */
    function register() {
      var q = $q.defer();
      if(push === undefined) {
        q.reject(new Error('init method must be called before'));
      } else {
        push.on('registration', function(data) {
          console.log('device: ', data.registrationId);
          q.resolve(data.registrationId);
          service.postRegIdToApi(data.registrationId).then(function(result) {
            alert(result);
          });
        });

      }
      return q.promise;

    }




  }

})();
