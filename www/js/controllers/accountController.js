angular.module('app.controllers')
.controller('AccountCtrl', function($scope, $state, $q, $ionicPopup, $ionicLoading, userRef, userService) {
  var fbID = userService.getFacebookID();

  if ( fbID != null ) {
    firebase.database().ref('users/' + fbID).once('value').then(function(snapshot) {
      $scope.photoURL = snapshot.val().photoURL;
      $scope.name = snapshot.val().name;
      $scope.email = snapshot.val().email;
      $scope.phone = snapshot.val().phone;
      $scope.github = snapshot.val().github;
      $state.reload();
    });
  }
  else {
    userRef.once('value').then(function(snapshot) {
      $scope.photoURL = snapshot.val().photoURL;
      $scope.name = snapshot.val().name;
      $scope.age = snapshot.val().age;
      $scope.email = snapshot.val().email;
      $scope.phone = snapshot.val().phone;
      $scope.location = snapshot.val().location;
      $scope.college = snapshot.val().college;
      $scope.languages = snapshot.val().languages;
      $scope.special = snapshot.val().special;
      $scope.website = snapshot.val().website;
      $scope.github = snapshot.val().github;
      $state.reload();
    });
    userRef.child('counts').once('value').then(function(snapshot) {
      var accountCount = snapshot.val().accountCount;

      if ( accountCount == 0 ) {
        accountCount++;
        userRef.child('counts').update({
          accountCount: accountCount
        });
        var firstAccount = $ionicPopup.show({
          title: 'Account Tab',
          template: 'In this tab, you can view and update your account information',
          cssClass: 'event-popup',
          buttons: [{
            text: 'OK',
            type: 'button-calm',
            onTap: function(e) {
              firstAccount.close();
            }
          }]
        });
      }
    });
  }

  /*
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( toState.name == 'tab.account') {
      $state.reload();
    }
  });
  */
  // Facebook Login
  var fbLoginSuccess = function(response) {
    var authResponse = response.authResponse;

    if ( !authResponse) {
      fbLoginError("Cant find the authResponse");
      return;
    }

    getFacebookProfileInfo(authResponse).then(function(profileInfo) {
      userRef.update({
        authResponse: authResponse,
        userID: profileInfo.id,
        photoURL: "https://graph.facebook.com/" + authResponse.userID + "/picture?type=square"
      });
      $ionicLoading.hide();
      profPicSuccess();
      $state.reload();
    }, function(fail) {
      console.log('profile info fail', fail);
      profPicError();
    });
  };

  var fbLoginError = function(error) {
    console.log('fbLoginError', error );
    $ionicLoading.hide();
    profPicError();
  };

  var getFacebookProfileInfo = function(authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email, name&access_token=' + authResponse.accessToken, null,
      function(response) {
        console.log(response);
        info.resolve(response);
      },
      function(response) {
        console.log(response);
        info.reject(response);
      });

    return info.promise;
  };

  $scope.updateFacebook = function() {
    facebookConnectPlugin.getLoginStatus(function(success) {
      if ( success.status === 'connected' ) {
        console.log('getLoginStatus', success.status);

        var user =  userRef.once('value').then(function(snapshot) {
          $scope.name = snapshot.val().name;
          $scope.email = snapshot.val().email;
          $scope.photoURL = snapshot.val().photoURL;
        });

        if ( !user.userID ) {
          getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
            userRef.update({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              photoURL: "https://graph.facebook.com/" + success.authResponse.userID + "/picture?type=square"
            });

            profPicSuccess();
            $state.reload();
          }, function(fail) {
            console.log('profile info fail', fail);
            profPicError();
          });
        }
        else {
          profPicSuccess();
          $state.reload();
        }
      }
      else {
        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };

});
