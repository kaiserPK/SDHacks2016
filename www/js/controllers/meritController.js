angular.module('app.controllers')
.controller('MeritCtrl', function($scope, $firebaseArray, $state, userRef, userService) {
  var ref = userRef.child("merits");
  var currUser = firebase.auth().currentUser;
  if ( currUser.uid != null ) {
    var uid = currUser.uid;
  }
  else {
    var uid = currUser.user.uid;
  }
  var totalRef = firebase.database().ref('users/' + uid + '/total');
  $scope.merits = $firebaseArray(ref);
  $scope.total = 0;

  totalRef.once('value').then(function(snapshot) {
    if ( snapshot.val() != null ) {
      $scope.total = snapshot.val().total;
    }
  });

  $scope.addMerit = function(merit) {
    if ( merit != null ) {
      if ( merit.amount % 5 == 0 ) {
        if ( merit.code == "garnett" ) {
          merit.date = new Date().getTime();
          $scope.total = $scope.total + merit.amount;
          totalRef.set({
            total: $scope.total
          });
          $scope.merits.$add(merit);
          $state.go('tab.merit-book');
        }
        else {
          userService.wrongCode();
        }
      }
      else {
        userService.not5();
      }
    }
    else {
      userService.notInt();
    }
  };

  $scope.addDemerit = function(merit) {
    if ( merit != null ) {
      if ( merit.amount % 5 == 0 ) {
        if ( merit.code == "garnett" ) {
          merit.date = new Date().getTime();
          merit.amount = -merit.amount;
          $scope.total = $scope.total + merit.amount;
          totalRef.set({
            total: $scope.total
          });
          $scope.merits.$add(merit);
          $state.go('tab.merit-book');
        }
        else {
          userService.wrongCode();
        }
      }
      else {
        userService.not5();
      }
    }
    else {
      userService.notInt();
    }
  };
});
