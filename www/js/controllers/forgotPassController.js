angular.module('app.controllers')
.controller('ForgotPassCtrl', function($scope, $ionicPopup) {
  var auth = firebase.auth();

  $scope.reset = function(user) {
    auth.sendPasswordResetEmail(user.email).then(function() {
      var passwordReset = $ionicPopup.alert({
        title: 'Success!',
        template: 'Email has been sent to reset password!'
      });
    }).catch(function(error) {
      var resetError = $ionicPopup.alert({
        title: 'Failure!',
        template: 'Please check if this is the correct email!'
      });
    });
  };
});

