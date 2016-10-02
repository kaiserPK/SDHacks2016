angular.module('app.services')
.factory('projectRef', function() {
  var projectRef = firebase.database().ref('projects/');
  return projectRef;
});
