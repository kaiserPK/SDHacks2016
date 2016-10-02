angular.module('app.controllers')
.controller('UserInfoCtrl', function($scope, $state, userRef) {
  userRef.once('value').then(function(snapshot) {
    $scope.photoURL = snapshot.val().photoURL;
  });

  $scope.updateInfo = function(user) {
    if ( user != null ) {
      userRef.update({
        age: user.age,
        phone: user.phone,
        location: user.location,
        college: user.college,
        languages: user.languages,
        special: user.special,
        website: user.website,
        github: user.github
      });
    }
    $state.go('tab.messenger');
  };
});
