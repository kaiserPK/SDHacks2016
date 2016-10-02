angular.module('app.controllers')
.controller('UserUpdateCtrl', function($scope, $state, userRef) {
  userRef.once('value').then(function(snapshot) {
    $scope.photoURL = snapshot.val().photoURL;
    $scope.phone = snapshot.val().phone;
    $scope.location = snapshot.val().location;
    $scope.college = snapshot.val().college;
    $scope.languages = snapshot.val().languages;
    $scope.special = snapshot.val().special;
    $scope.website = snapshot.val().website;
    $scope.github = snapshot.val().github;
  });

  $scope.updateUser = function(user) {
    userRef.update({
      phone: user.phone,
      location: user.location,
      college: user.college,
      languages: user.languages,
      special: user.special,
      website: user.website,
      github: user.github
    });
    $state.go('tab.account');
  };
});
