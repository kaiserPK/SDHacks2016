angular.module('app.controllers')
.controller('ProjectMembersCtrl', function($scope, $firebaseArray, $state, userService) {
  var uid = firebase.auth().currentUser.uid;
  var bulbID = userService.getBulbID();
  var ref = firebase.database().ref('users/' + uid + '/projects/' + bulbID).child("currentMembers");

  $scope.goBack = function() {
    $state.go('tab.projects');
  }

  $scope.currentMem = $firebaseArray(ref);

  $scope.showInfo = function(curr) {
    userService.setCurrID(curr.$id);
    $state.go('project.member-info');
  };
});
