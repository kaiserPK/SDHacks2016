angular.module('app.controllers')
.controller('PassUpdateCtrl', function($scope, $state, $ionicPopup, userService) {
  var currUser = firebase.auth().currentUser;
  var currPassword = userService.getPassword();
  var credential = firebase.auth.EmailAuthProvider.credential(currUser.email, currPassword);

  $scope.update = function(user) {
    currUser.reauthenticate(credential).then(function() {
      if ( currPassword == user.oldPassword ) {
        currUser.updatePassword(user.newPassword).then(function() {
          userService.setPassword(user.newPassword);
          var updateSuccess = $ionicPopup.alert({
            title: 'Success!',
            template: 'Your password has been updated!'
          });
          $state.go('tab.account');
        }).catch(function(error) {
          var updateError = $ionicPopup.alert({
            title: 'Failure!',
            template: 'Failed to update password!'
          });
        });
      }
      else {
        var passError = $ionicPopup.alert({
          title: 'Failure!',
          template: 'Incorrect password!'
        });
      }
    });
  };
});
