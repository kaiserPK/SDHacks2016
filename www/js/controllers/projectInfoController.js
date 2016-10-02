angular.module('app.controllers')
.controller('ProjectInfoCtrl', function($scope, $state, userRef, userService) {
  var id = userService.getBulbID();
  var projectsRef = userRef.child("projects");
  
  projectsRef.child(id).once('value').then(function(snapshot) {
    $scope.name = snapshot.val().name;
    $scope.languages = snapshot.val().languages;
    $scope.category = snapshot.val().category;
    $scope.skill = snapshot.val().skill;
    $scope.location = snapshot.val().location;
    $scope.description = snapshot.val().descript;
  });

  $scope.goBack = function() {
    $state.go('tab.projects');
  };

});
