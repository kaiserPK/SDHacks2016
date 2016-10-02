angular.module('app.controllers')
.controller('MyBulbMembersCtrl', function($scope, $firebaseArray, $state, userService) {
  var uid = firebase.auth().currentUser.uid;
  var bulbID = userService.getBulbID();
  var pendingRef = firebase.database().ref('users/' + uid + '/bulbs/' + bulbID).child("pendingMembers");
  var currentRef = firebase.database().ref('users/' + uid + '/bulbs/' + bulbID).child("currentMembers");
  $scope.pendingMem = $firebaseArray(pendingRef);
  $scope.currentMem = $firebaseArray(currentRef);

  $scope.goBack = function() {
    $state.go('tab.bulbs');
  };

  $scope.showInfo = function(curr) {
    userService.setCurrID(curr.$id);
    $state.go('my-bulb.curr-info');
  };

  $scope.showInfo = function(pend) {
    userService.setPendID(pend.$id);
    $state.go('my-bulb.pend-info');
  };

  $scope.accept = function(pend) {
    var oldRef = pendingRef.child(pend.$id);
    var newRef = currentRef.child(pend.$id);
    var bulbRef = firebase.database().ref('users/' + uid + '/bulbs/' + bulbID); 
    var projectRef = firebase.database().ref('users/' + pend.$id + '/projects/' + bulbID);

    oldRef.once('value', function(snapshot) {
      newRef.set({
        name: snapshot.val().name,
        photoURL: snapshot.val().photoURL,
      }).then(function(error) {
        if ( !error ) {
          oldRef.remove();
        }
        else {
          console.log(error);
        }
      });
    });

    bulbRef.once('value', function(snapshot) {
      projectRef.set({
        name: snapshot.val().name,
        admin: snapshot.val().admin,
        category: snapshot.val().category,
        currentMembers: snapshot.val().currentMembers,
        description: snapshot.val().description,
        languages: snapshot.val().languages,
        location: snapshot.val().location,
        skill: snapshot.val().skill,
        messages: snapshot.val().messages
      }).catch(function(error) {
        console.log(error);
      });
    });
  };

  $scope.decline = function(pend) {
    var oldRef = pendingRef.child(pend.$id);
    oldRef.remove();
  };

  $scope.kick = function(curr) {
    var newRef = currentRef.child(curr.$id);
    newRef.remove();
  };
});
