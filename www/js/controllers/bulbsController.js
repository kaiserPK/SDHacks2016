angular.module('app.controllers')
.controller('BulbsCtrl', function($scope, $firebaseArray, $ionicModal, $ionicPopup, userRef, bulbRef) {
  var countRef = userRef.child('counts');
  $scope.bulbs = $firebaseArray(bulbRef);

  countRef.once('value').then(function(snapshot) {
    var ideaCount = snapshot.val().ideaCount;

    if ( ideaCount == 0 ) {
      ideaCount++;
      userRef.child('counts').update({
        ideaCount: ideaCount
      });
      var firstIdea = $ionicPopup.show({
        title: 'My Bulbs Tab',
        template: 'In this tab, you will be able to publish any ideas you have in order to bring them to reality',
        cssClass: 'event-popup',
        buttons: [{
          text: 'OK',
          type: 'button-calm',
          onTap: function(e) {
            firstIdea.close();
          }
        }]
      });
    }
  });

  $scope.delete = function(bulb) {
    var deleteBulb = $ionicPopup.show({
      title: 'Delete Bulb',
      template: 'Are you sure you want to delete this bulb? You can not revert your decision.',
      cssClass: 'event-popup',
      buttons: [{
        text: 'Yes',
        type: 'button-calm',
        onTap: function(e) {
          $scope.bulbs.$remove(bulb);
        }
      },
      {
        text: 'No',
        type: 'button-calm',
        onTap: function(e) {
          deleteBulb.close();
        }
      }]
    });
  }
  
  $ionicModal.fromTemplateUrl('templates/new-bulb.html', {
    scope: $scope,
    animation: 'slide-in-left'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.bulb={};
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.addBulb = function(bulb) {
    $scope.bulbs.$add(bulb);
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
});
