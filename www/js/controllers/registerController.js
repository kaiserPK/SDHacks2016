angular.module('app.controllers')
.controller('RegisterCtrl', function($scope, $firebaseAuth, $state, $ionicPopup, userService) {
  var auth = firebase.auth();
  var imgURL = "img/default.jpeg";
  var user = null;

  $scope.register = function(user) {
    if ( user.code.toLowerCase() == "garnett" ) {
      auth.createUserWithEmailAndPassword(user.email, user.password).then(function() {
        currUser = auth.currentUser;
        userService.writeUserData(currUser.uid, user.name, user.email, user.password, imgURL);
        currUser.sendEmailVerification();
      }).then(function() {
        currUser.updateProfile({
          displayName: user.name,
          photoURL: imgURL
        })
      }).then(function() {
        var signSuccess = $ionicPopup.alert({
          title: 'Success!',
          template: 'You have created a new account! Please verify your email now.'
        });
        $state.go('login');
      }).catch(function(error) {
        var signError = $ionicPopup.alert({
          title: 'Error!',
          template: 'Please check your credentials!'
        });
      });
    }
    else {
      var codeError = $ionicPopup.alert({
        title: 'Error!',
        template: 'Please enter the correct secret code!'
      });
    }
  };
});
