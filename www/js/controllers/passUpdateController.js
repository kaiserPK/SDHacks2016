angular.module('app.controllers')
.controller('PassUpdateCtrl', function($scope, $state, $ionicPopup, userRef) {
  var currUser = firebase.auth().currentUser;

  userRef.once('value').then(function(snapshot) {
    $scope.currEmail = snapshot.val().email;
    $scope.currPassword = snapshot.val().password;
  })

  $scope.update = function(user) {
    var credential = firebase.auth.EmailAuthProvider.credential($scope.currEmail, $scope.currPassword);
    currUser.reauthenticate(credential).then(function() {
      if ( $scope.currPassword == user.oldPassword ) {
        currUser.updatePassword(user.newPassword).then(function() {
          userRef.update({
            password: user.newPassword
          });
          var updateSuccess = $ionicPopup.alert({
            title: 'Success!',
            template: 'Your password has been updated!'
          });
          $state.go('tab.account');
        }).catch(function(error) {
          var updateError = $ionicPopup.alert({
            title: 'Error!',
            template: 'Failed to update password!'
          });
        });
      }
      else {
        var passError = $ionicPopup.alert({
          title: 'Error!',
          template: 'Incorrect password!'
        });
      }
    });
  };
});
