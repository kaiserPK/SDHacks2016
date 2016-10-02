angular.module('app.controllers')
.controller('SearchCtrl', function($scope, $firebaseArray, $ionicPopup, $state, projectRef, userService) {
  $scope.bulbs = $firebaseArray(projectRef);

  $scope.showInfo = function(bulb) {
    userService.setBulbID(bulb.$id);
    $state.go('tab.searched-bulb');
  };
});
