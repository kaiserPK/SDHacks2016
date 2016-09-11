angular.module('app.controllers')
.controller('RegisterCtrl', function($scope, $firebaseAuth, $state, $ionicPopup, userService) {
  var auth = firebase.auth();
  var imgURL = "https://pbs.twimg.com/profile_images/534594352291774464/UdYxN8ov_400x400.jpeg";
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
          title: 'Failed!',
          template: 'Please check your credentials!'
        });
      });
    }
    else {
      var codeError = $ionicPopup.alert({
        title: 'Failed!',
        template: 'Please enter the correct secret code!'
      });
    }
  };
});
