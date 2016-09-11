angular.module('app.services')
.service('userService', function($ionicPopup) {
  var signedInUser;
  var password;
  var photoURL;

  return {
    getUser: function() {
      return signedInUser;
    },
    setUser: function(user) {
      signedInUser = user;
    },
    getPassword: function() {
      return password;
    },
    setPassword: function(pass) {
      password = pass;
    },
    getPhotoURL: function() {
      return photoURL;
    },
    setPhotoURL: function(url) {
      photoURL = url;
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
        title: 'Failed!',
        template: 'Please enter an integer!'
      });
    },
    not5: function() {
      var not5 = $ionicPopup.alert({
        title: 'Failed!',
        template: 'Please enter an integer that is a multiple of 5!'
      });
    },
    wrongCode: function() {
      var wrongCode = $ionicPopup.alert({
        title: 'Failed!',
        template: 'Please enter the correct secret code!'
      });
    }
  };
});
