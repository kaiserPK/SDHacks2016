angular.module('app.controllers')
.controller('AccountCtrl', function($scope, $state, $ionicModal, $ionicPopup, $ionicLoading, userRef, userService) {
  var fbID = userService.getFacebookID();

  if ( fbID != null ) {
    firebase.database().ref('users/' + fbID).once('value').then(function(snapshot) {
      $scope.photoURL = snapshot.val().photoURL;
      $scope.name = snapshot.val().name;
      $scope.email = snapshot.val().email;
      $scope.phone = snapshot.val().phone;
      $scope.github = snapshot.val().github;
      $state.reload();
    });
  }
  else {
    userRef.once('value').then(function(snapshot) {
      $scope.photoURL = snapshot.val().photoURL;
      $scope.name = snapshot.val().name;
      $scope.age = snapshot.val().age;
      $scope.email = snapshot.val().email;
      $scope.phone = snapshot.val().phone;
      $scope.location = snapshot.val().location;
      $scope.college = snapshot.val().college;
      $scope.languages = snapshot.val().languages;
      $scope.special = snapshot.val().special;
      $scope.website = snapshot.val().website;
      $scope.github = snapshot.val().github;
      $state.reload();
    });
    userRef.child('counts').once('value').then(function(snapshot) {
      var accountCount = snapshot.val().accountCount;

      if ( accountCount == 0 ) {
        accountCount++;
        userRef.child('counts').update({
          accountCount: accountCount
        });
        var firstAccount = $ionicPopup.show({
          title: 'Account Tab',
          template: 'In this tab, you can view and update your account information',
          cssClass: 'event-popup',
          buttons: [{
            text: 'OK',
            type: 'button-calm',
            onTap: function(e) {
              firstAccount.close();
            }
          }]
        });
      }
    });
  }
 
  $ionicModal.fromTemplateUrl('templates/user-update.html', {
    scope: $scope,
    animation: 'slide-in-left'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.user = {};
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.updateUser = function(user) {
    userRef.update({
      age: user.age,
      phone: user.phone,
      location: user.location,
      college: user.college,
      languages: user.languages,
      special: user.special,
      website: user.website,
      github: user.github
    });
    userRef.once('value').then(function(snapshot) {
      $scope.photoURL = snapshot.val().photoURL;
      $scope.name = snapshot.val().name;
      $scope.age = snapshot.val().age;
      $scope.email = snapshot.val().email;
      $scope.phone = snapshot.val().phone;
      $scope.location = snapshot.val().location;
      $scope.college = snapshot.val().college;
      $scope.languages = snapshot.val().languages;
      $scope.special = snapshot.val().special;
      $scope.website = snapshot.val().website;
      $scope.github = snapshot.val().github;
      $state.reload();
    });
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $ionicModal.fromTemplateUrl('templates/pass-update.html', {
    scope: $scope,
    animation: 'slide-in-left'
  }).then(function(mod) {
    $scope.mod = mod;
  });

  $scope.openPass = function() {
    $scope.pass = {};
    $scope.mod.show();
  };
  $scope.closePass = function() {
    $scope.mod.hide();
  };
  $scope.update = function(pass) {
    var currUser = firebase.auth().currentUser;
    var currEmail;
    userRef.once('value').then(function(snapshot) {
      currEmail = snapshot.val().email;
      $scope.currPassword = snapshot.val().password;

      var credential = firebase.auth.EmailAuthProvider.credential(currEmail, $scope.currPassword);
      currUser.reauthenticate(credential).then(function() {
        if ( $scope.currPassword == pass.oldPassword ) {
          currUser.updatePassword(pass.newPassword).then(function() {
            userRef.update({
              password: pass.newPassword
            });
            var updateSuccess = $ionicPopup.show({
              title: 'Success!',
              template: 'Your password has been updated!!',
              cssClass: 'event-popup',
              buttons: [{
                text: 'OK',
                type: 'button-calm',
                onTap: function(e) {
                  updateSuccess.close();
                }
              }]
            });
            $scope.mod.hide();
            $scope.modal.hide();
          }).catch(function(error) {
            var resetError = $ionicPopup.show({
              title: 'Error!',
              template: 'Failed to update password!!',
              cssClass: 'event-popup',
              buttons: [{
                text: 'OK',
                type: 'button-calm',
                onTap: function(e) {
                  updateError.close();
                }
              }]
            });
          });
        }
        else {
          var passError = $ionicPopup.show({
            title: 'Error!',
            template: 'Incorrect Password!',
            cssClass: 'event-popup',
            buttons: [{
              text: 'OK',
              type: 'button-calm',
              onTap: function(e) {
                passError.close();
              }
            }]
          });
        }
      });
    });
  };
});
