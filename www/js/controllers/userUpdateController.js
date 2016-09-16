angular.module('app.controllers')
.controller('UserUpdateCtrl', function($scope, $state, userRef) {
  userRef.once('value').then(function(snapshot) {
    $scope.photoURL = snapshot.val().photoURL;
  });

  $scope.updateUser = function(user) {
    userRef.update({
      phone: user.phone,
      major: user.major
    });
    $state.go('tab.account');
  };
});
