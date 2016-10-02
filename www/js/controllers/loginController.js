angular.module('app.controllers')
.controller('LoginCtrl', function($scope, $firebaseAuth, $state, $ionicPopup, $ionicHistory, $ionicLoading, $q, userService) {
  var auth = firebase.auth();

  // Login with email and password
  $scope.login = function(user) {

    auth.signInWithEmailAndPassword(user.email, user.password).then(function(firebaseUser) {
      if ( firebaseUser.emailVerified ) {
        console.log("Signed in as:", firebaseUser);
        var ref = firebase.database().ref('users/' + firebaseUser.uid).child('counts');
        ref.once('value').then(function(snapshot) {
          var loginCount = snapshot.val().loginCount;
          if ( loginCount == 0 ) {
            loginCount++;
            ref.update({
              loginCount: loginCount
            });
            $state.go('user-info');
            var firstLogin = $ionicPopup.show({
              title: 'Welcome to HackAGo!',
              template: 'Please fill out the following optional fields!',
              cssClass: 'event-popup',
              buttons: [{
                text: 'OK',
                type: 'button-calm',
                onTap: function(e) {
                  firstLogin.close();
                }
              }]
            });
          }
          else {
            $state.go('tab.bulbs');
          }
        });
      }
      else {
        var verifyError = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please verify your email!'
        });
      }
    }).catch(function(error) {
      var loginError = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  }

  // Facebook Login
  /*var fbLoginSuccess = function(response) {
    var authResponse = response.authResponse;

    if ( !authResponse) {
      fbLoginError("Cant find the authResponse");
      return;
    }

    getFacebookProfileInfo(authResponse).then(function(profileInfo) {
      userService.setFacebookID(profileInfo.id);
      firebase.database().ref('users/' + profileInfo.id).set({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        photoURL: "https://graph.facebook.com/" + authResponse.userID + "/picture?type=square"
      });
      $ionicLoading.hide();
      $state.go('tab.messenger');
    }, function(fail) {
      console.log('profile info fail', fail);
    });
  };

  var fbLoginError = function(error) {
    console.log('fbLoginError', error );
    $ionicLoading.hide();
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

  $scope.authWithFacebook = function() {
    facebookConnectPlugin.getLoginStatus(function(success) {
      if ( success.status === 'connected' ) {
        console.log('getLoginStatus', success.status);

        var fbID = userService.getFacebookID();
        var user =  firebase.database().ref('users/' + fbID).once('value').then(function(snapshot) {
          $scope.name = snapshot.val().name;
          $scope.email = snapshot.val().email;
          $scope.photoURL = snapshot.val().photoURL;
        });

        if ( !user.userID ) {
          getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
            userService.setFacebookID(profileInfo.id);
            firebase.database().ref('users/' + profileInfo.id).set({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              photoURL: "https://graph.facebook.com/" + success.authResponse.userID + "/picture?type=square"
            });

            $state.go('tab.messenger');
          }, function(fail) {
            console.log('profile info fail', fail);
          });
        }
        else {
          $state.go('tab.messenger');
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
  };*/
});
