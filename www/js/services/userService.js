angular.module('app.services')
.service('userService', function($ionicPopup) {
  var messageID;
  var facebookID;
  var bulbID;
  var adminID;
  var bulbKey;
  var currID;
  var pendID;

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
    getBulbID: function() {
      return bulbID;
    },
    setBulbID: function(id) {
      bulbID = id;
    },
    getAdminID: function() {
      return adminID;
    },
    setAdminID: function(id) {
      adminID = id;
    },
    getKey: function() {
      return bulbKey;
    },
    setKey: function(key) {
      bulbKey = key;
    },
    getCurrID: function() {
      return currID;
    },
    setCurrID: function(id) {
      currID = id;
    },
    getPendID: function() {
      return pendID;
    },
    setPendID: function(id) {
      pendID = id;
    },
    writeUserData: function(uid, name, email, password, imageURL) {
      firebase.database().ref('users/' + uid).set({
        name: name,
        email: email,
        password: password,
        photoURL: imageURL
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
