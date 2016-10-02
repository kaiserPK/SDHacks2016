angular.module('app.controllers')
.controller('ProjectsCtrl', function($scope, $firebaseArray, $state, userRef, userService) {
  var projectsRef = userRef.child('projects');
  $scope.projects = $firebaseArray(projectsRef);
  
  $scope.showInfo = function(project) {
    userService.setBulbID(project.$id);
    $state.go('project.info');
  };
});
