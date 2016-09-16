angular.module('app.controllers')
.controller('UserDetailCtrl', function($scope, userService) {
  var messageID = userService.getMessageID();
  var ref = firebase.database().ref('messages/' + messageID);

  ref.once('value').then(function(snapshot) {
    $scope.photoURL = snapshot.val().photo;
    $scope.name = snapshot.val().name;
    $scope.email = snapshot.val().email;
  });
});
