angular.module('app.controllers')
.controller('MsgCtrl', function($scope, $firebaseAuth, $firebaseArray, $ionicScrollDelegate, $timeout, userRef, userService) {
  var msgRef = firebase.database().ref().child("messages");
  $scope.messages = $firebaseArray(msgRef);
  $scope.signedInUser = userService.getUser();

  userRef.once('value').then(function(snapshot) {
    $scope.photoURL = snapshot.val().photoURL;
    $scope.name = snapshot.val().name;
  });

  $timeout(function() {
    $ionicScrollDelegate.scrollBottom();
  }, 455);

  $scope.like = function(message) {
    var likeRef = firebase.database().ref('messages/' + message.$id);

    if ( $scope.likes == null ) {
      $scope.likes = 0;
    }
    likeRef.on('value', function(snapshot) {
      $scope.likes = snapshot.val().likes;
    });

    $scope.likes++;

    likeRef.update({
      likes: $scope.likes
    });
  }

  $scope.addMessage = function(message) {
    message.time = new Date().getTime();
    message.photo = $scope.photoURL;
    message.name = $scope.name;
    message.likes = 0;
    $scope.messages.$add(message);
    message.text = "";
    $ionicScrollDelegate.scrollBottom(true);
    console.log(message);
  };
});
