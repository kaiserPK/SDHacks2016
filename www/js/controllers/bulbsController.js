angular.module('app.controllers')
.controller('BulbsCtrl', function($scope, $firebaseArray, $ionicModal, $ionicPopup, $state, userRef, projectRef, userService) {
  var uid = firebase.auth().currentUser.uid;
  var countRef = userRef.child('counts');
  var bulbRef = userRef.child('bulbs');
  $scope.projects = $firebaseArray(projectRef);
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

  $scope.showInfo = function(bulb) {
    userService.setBulbID(bulb.$id);
    userService.setAdminID(uid);
    $state.go('my-bulb.info');
  };

  $scope.delete = function(bulb) {
    var deleteBulb = $ionicPopup.show({
      title: 'Delete Bulb',
      template: 'Are you sure you want to delete this bulb? You can not revert your decision.',
      cssClass: 'event-popup',
      buttons: [{
        text: 'Yes',
        type: 'button-calm',
        onTap: function(e) {
          var key = userService.getKey();
          $scope.bulbs.$remove(bulb);
          projectRef.child(key).remove(); 
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
    $scope.bulb = {};
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.addBulb = function(bulb) {
    if ( bulb.name == null || bulb.languages == null || bulb.category == null || bulb.skill == null || bulb.location == null || bulb.description == null ) {
      var bulbError = $ionicPopup.show({
        title: 'Error!',
        template: 'Please fill out all the fields!',
        cssClass: 'event-popup',
        buttons: [{
          text: 'OK',
          type: 'button-calm',
          onTap: function(e) {
            bulbError.close();
          }
        }]
      });
    }
    else {
      userRef.once('value').then(function(snapshot) {
        bulb.photoURL = snapshot.val().photoURL;
        bulb.admin = snapshot.val().name;
        bulb.adminID = firebase.auth().currentUser.uid;
        $scope.projects.$add(bulb).then(function(ref) {
          userService.setKey(ref.key);
          $scope.bulbs.$add(bulb).then(function(ref) {
            var key = userService.getKey();
            projectRef.child(key).update({
              bulbID: ref.key
            });
          });
        });
        $scope.modal.hide();
      });
    }
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
});
