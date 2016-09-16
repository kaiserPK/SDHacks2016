angular.module('app.controllers')
.controller('MsgCtrl', function($scope, $firebaseArray, $ionicScrollDelegate, $timeout, userRef, userService) {
  var fbID = userService.getFacebookID();
  var msgRef = firebase.database().ref().child("messages");
  $scope.messages = $firebaseArray(msgRef);

  if ( fbID != null ) {
    firebase.database().ref('users/' + fbID).once('value').then(function(snapshot) {
      $scope.photoURL = snapshot.val().photoURL;
      $scope.name = snapshot.val().name;
      $scope.email = snapshot.val().email;
    });
  }
  else {
    userRef.once('value').then(function(snapshot) {
      $scope.photoURL = snapshot.val().photoURL;
      $scope.name = snapshot.val().name;
      $scope.email = snapshot.val().email;
    });
  }

  $timeout(function() {
    $ionicScrollDelegate.scrollBottom();
  }, 500);

  $scope.like = function(message) {
    var likeRef = firebase.database().ref('messages/' + message.$id);

    if ( $scope.likes == null ) {
      $scope.likes = 0;
    }
    likeRef.on('value', function(snapshot) {
      if ( snapshot.val() != null ) {
        $scope.likes = snapshot.val().likes;
      }
    });

    $scope.likes++;

    likeRef.update({
      likes: $scope.likes
    });
  };

  $scope.seeProfile = function(message) {
    userService.setMessageID(message.$id);
  };

  $scope.addMessage = function(message) {
    message.time = new Date().getTime();
    message.photo = $scope.photoURL;
    message.name = $scope.name;
    message.email = $scope.email;
    message.likes = 0;
    $scope.messages.$add(message);
    message.text = "";
    $ionicScrollDelegate.scrollBottom(true);
  };
});
