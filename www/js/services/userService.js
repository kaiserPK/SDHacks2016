angular.module('app.services')
.service('userService', function($ionicPopup) {
  var messageID;
  var facebookID;

  return {
    getMessageID: function() {
      return messageID;
    },
    setMessageID: function(id) {
      messageID = id;
    },
    getFacebookID: function() {
      return facebookID;
    },
    setFacebookID: function(fbID) {
      facebookID = fbID;
    },
    writeUserData: function(uid, name, email, password, imageURL) {
      firebase.database().ref('users/' + uid).set({
        name: name,
        email: email,
        password: password,
        photoURL: imageURL
      });
    },
    notInt: function() {
      var notInt = $ionicPopup.alert({
        title: 'Error!',
        template: 'Please enter an integer!'
      });
    },
    noActive: function() {
      var noActive = $ionicPopup.alert({
        title: 'Error!',
        template: 'Please enter an Active!'
      });
    },
    noReason: function() {
      var noReason = $ionicPopup.alert({
        title: 'Error!',
        template: 'Please enter a reason!'
      });
    },
    not5: function() {
      var not5 = $ionicPopup.alert({
        title: 'Error!',
        template: 'Please enter an integer that is a multiple of 5!'
      });
    },
    wrongCode: function() {
      var wrongCode = $ionicPopup.alert({
        title: 'Error!',
        template: 'Please enter the correct secret code!'
      });
    },
    profPicSuccess: function() {
      var profPicSuccess = $ionicPopup.alert({
        title: 'Success!',
        template: 'Your profile picture has been changed!'
      });
    },
    profPicError: function() {
      var profPicError = $ionicPopup.alert({
        title: 'Error!',
        template: 'There was a problem changing your profile picture!'
      });
    }
  };
});
