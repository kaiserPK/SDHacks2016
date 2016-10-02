angular.module('app.controllers')
.controller('MyBulbInfoCtrl', function($scope, $state, userRef, userService) {
  var id = userService.getBulbID();
  var bulbRef = userRef.child("bulbs");
  
  bulbRef.child(id).once('value').then(function(snapshot) {
    $scope.name = snapshot.val().name;
    $scope.languages = snapshot.val().languages;
    $scope.category = snapshot.val().category;
    $scope.skill = snapshot.val().skill;
    $scope.location = snapshot.val().location;
    $scope.description = snapshot.val().descript;
  });

  $scope.goBack = function() {
    $state.go('tab.bulbs');
  };
});
