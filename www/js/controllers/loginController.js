angular.module('app.controllers')
.controller('LoginCtrl', function($scope, $firebaseAuth, $state, $ionicPopup, userService) {
  var auth = firebase.auth();

  $scope.login = function(user) {

    auth.signInWithEmailAndPassword(user.email, user.password).then(function(firebaseUser) {
      if ( firebaseUser.emailVerified ) {
        console.log("Signed in as:", firebaseUser);
        $scope.signedInUser = firebaseUser;
        userService.setUser(firebaseUser);
        userService.setPassword(user.password);
        $state.go('tab.messenger');
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

  var fbAuth = $firebaseAuth();
  $scope.authWithFacebook = function() {
    fbAuth.$signInWithPopup("facebook").then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser);
      /*$scope.signedInUser = firebaseUser;
      userService.setUser(firebaseUser);*/
      firebase.database().ref('users/' + firebaseUser.user.uid).set({
        name: firebaseUser.user.displayName,
        email: firebaseUser.user.email,
        photoURL: "https://graph.facebook.com/" + firebaseUser.user.providerData[0].uid + "/picture?type=square"
      });
      $state.go('tab.messenger');
    }).catch(function(error) {
      console.log(error);
    });
  }
});
