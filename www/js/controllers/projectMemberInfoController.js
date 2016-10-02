angular.module('app.controllers')
.controller('ProjectMemberInfoCtrl', function($scope, userService) {
  var uid = userService.getCurrID();
  var ref = firebase.database().ref('users/' + uid);

  ref.once('value').then(function(snapshot) {
    $scope.photoURL = snapshot.val().photoURL;
    $scope.name = snapshot.val().name;
    $scope.age = snapshot.val().age;
    $scope.email = snapshot.val().email;
    $scope.phone = snapshot.val().phone;
    $scope.location = snapshot.val().location;
    $scope.college = snapshot.val().college;
    $scope.languages = snapshot.val().languages;
    $scope.special = snapshot.val().special;
    $scope.website = snapshot.val().website;
    $scope.github = snapshot.val().github;
  });
});
