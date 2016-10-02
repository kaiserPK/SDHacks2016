angular.module('app.services')
.factory('bulbRef', function() {
  var currUser = firebase.auth().currentUser;
  var uid = currUser.uid;
  var bulbRef = firebase.database().ref('projects/' + uid);
  return bulbRef;
});
