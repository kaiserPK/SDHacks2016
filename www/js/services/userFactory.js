angular.module('app.services')
.factory('userRef', function() {
  var currUser = firebase.auth().currentUser;
  if ( currUser.uid != null ) {
    var uid = currUser.uid;
  }
  else {
    var uid = currUser.user.uid;
  }
  var userRef = firebase.database().ref('users/' + uid);
  return userRef;
});
