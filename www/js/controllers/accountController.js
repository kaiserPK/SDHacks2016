angular.module('app.controllers')
.controller('AccountCtrl', function($scope, $state, userRef, userService) {
  var auth = firebase.auth();

  userRef.once('value').then(function(snapshot) {
    $scope.photoURL = snapshot.val().photoURL;
    $scope.name = snapshot.val().name;
    $scope.email = snapshot.val().email;
    $state.reload();
  });
});
