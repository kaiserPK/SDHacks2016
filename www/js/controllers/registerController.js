angular.module('app.controllers')
.controller('RegisterCtrl', function($scope, $firebaseAuth, $state, $ionicPopup, userService) {
  var auth = firebase.auth();
  var imgURL = "img/default.png";
  var user = null;

  $scope.register = function(user) {
    if ( user.password == user.confirm ) {
      auth.createUserWithEmailAndPassword(user.email, user.password).then(function() {
        currUser = auth.currentUser;
        userService.writeUserData(currUser.uid, user.name, user.email, user.password, imgURL);
        currUser.sendEmailVerification();
      }).then(function() {
        currUser.updateProfile({
          displayName: user.name,
          photoURL: imgURL
        });
        var ref = firebase.database().ref('users/' + currUser.uid).child('counts');
        ref.update({
          loginCount: 0,
          ideaCount: 0,
          projectCount: 0,
          searchCount: 0,
          msgCount: 0,
          accountCount: 0
        });
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
      var confirmError = $ionicPopup.alert({
        title: 'Error!',
        template: 'Your passwords do not match!'
      });
    }
  };
});
