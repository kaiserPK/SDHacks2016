angular.module('app.services')
.factory('userRef', function() {
  var currUser = firebase.auth().currentUser;
  var uid = currUser.uid;
  var userRef = firebase.database().ref('users/' + uid);
  return userRef;
});
