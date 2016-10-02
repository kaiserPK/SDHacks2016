angular.module('app.controllers')
.controller('SearchedBulbCtrl', function($scope, $ionicPopup, userRef, projectRef, userService) {
  var uid = firebase.auth().currentUser.uid;
  var id = userService.getBulbID();
  var ref = firebase.database().ref('projects/' + id);

  projectRef.child(id).once('value').then(function(snapshot) {
    $scope.admin = snapshot.val().admin;
    $scope.name = snapshot.val().name;
    $scope.languages = snapshot.val().languages;
    $scope.category = snapshot.val().category;
    $scope.skill = snapshot.val().skill;
    $scope.location = snapshot.val().location;
    $scope.description = snapshot.val().description;
  });

  $scope.join = function() {
    userRef.once('value').then(function(snapshot) {
      var name = snapshot.val().name;
      var photoURL = snapshot.val().photoURL;

      ref.once('value').then(function(snapshot) {
        var adminID = snapshot.val().adminID;
        var bulbID = snapshot.val().bulbID;
        var finalRef = firebase.database().ref('users/' + adminID + '/bulbs/' + bulbID).child("pendingMembers");
        
        finalRef.child(uid).update({
          name: name,
          photoURL: photoURL
        });

        var requestSent = $ionicPopup.show({
          title: 'Request Sent!',
          template: 'The admin has been notified of your interest in the project.',
          cssClass: 'event-popup',
          buttons: [{
            text: 'OK',
            type: 'button-calm',
            onTap: function(e) {
              requestSent.close();
            }
          }]
        });
      });
    });
  };
});
