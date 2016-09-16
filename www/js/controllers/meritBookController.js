angular.module('app.controllers')
.controller('MeritBookCtrl', function($scope, $firebaseArray, $ionicScrollDelegate, $timeout, userRef, userService) {
  var ref = userRef.child("merits");
  var currUser = firebase.auth().currentUser;
  if ( currUser != null ) {
    var uid = currUser.uid;
  }
  else {
    var uid = userService.getFacebookID();
  }
  var totalRef = firebase.database().ref('users/' + uid + '/total');
  $scope.merits = $firebaseArray(ref);
  $scope.total = 0;

  if ( $scope.active != null ) {
    ref.once('value').then(function(snapshot) {
      $scope.active = snapshot.val().active;
      $scope.date = snapshot.val().date;
      $scope.reason = snapshot.val().reason;
      $scope.amount = snapshot.val().amount;
    });
  }

  totalRef.on('value', function(snapshot) {
    if ( snapshot.val() != null ) {
      $scope.total = snapshot.val().total;
      $timeout(function() {
        $ionicScrollDelegate.scrollBottom(true);
      }, 500);
    }
  });

  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  };

  $scope.scrollBottom = function() {
    $ionicScrollDelegate.scrollBottom(true);
  };
});
