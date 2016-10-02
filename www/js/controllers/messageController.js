angular.module('app.controllers')
.controller('MsgCtrl', function($scope, $firebaseArray, $ionicPopup, $ionicScrollDelegate, $timeout, userRef, userService) {
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
    userRef.child('counts').once('value').then(function(snapshot) {
      var msgCount = snapshot.val().msgCount;

      if ( msgCount == 0 ) {
        msgCount++;
        userRef.child('counts').update({
          msgCount: msgCount
        });
        var firstMsg = $ionicPopup.show({
          title: 'Messaging Tab',
          template: 'In this tab, you will be able to communicate with other hackers to discuss projects',
          cssClass: 'event-popup',
          buttons: [{
            text: 'OK',
            type: 'button-calm',
            onTap: function(e) {
              firstMsg.close();
            }
          }]
        });
      }
    });
  }

  $timeout(function() {
    $ionicScrollDelegate.scrollBottom();
  }, 500);

  $scope.like = function(message) {
    var likeRef = firebase.database().ref('messages/' + message.$id);
    var likes;
    
    likeRef.on('value', function(snapshot) {
      if ( snapshot.val() != null ) {
        likes = snapshot.val().likes;
      }
    });

    likes++;

    likeRef.update({
      likes: likes
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
