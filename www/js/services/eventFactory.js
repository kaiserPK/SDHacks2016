angular.module('app.services')
.factory('Events', function($q, $cordovaCalendar, $ionicPopup) {
  
  var rocks = {
    "title": "Rocks",
    "location": "Muir College",
    "startDate": new Date(2016, 9, 21, 12, 0, 0),
    "endDate": new Date(2016, 9, 21, 20, 0, 0)
  };
  
  var obstacle = {
    "title": "Obstacle Course",
    "location": "UCSD",
    "startDate": new Date(2016, 11, 21, 8, 0, 0),
    "endDate": newDate(2016, 11, 21, 14, 0, 0)
  };
  
  var scavenger = {
    "title": "Scavenger Hunt",
    "location": "Gilman Parking Structure",
    "startDate": new Date(2016, 10, 1, 10, 0, 0),
    "endDate": new Date(2016, 10, 1, 22, 0, 0)
  };

  var events = [];
  events.push(rocks, obstacle, scavenger);

  var addEvent = function(event) {
    var deferred = $q.defer();

    $cordovaCalendar.createEvent({
      title: event.title,
      location: event.location,
      startDate: event.startDate,
      endDate: event.endDate
    }).then(function(result) {
      var addSuccess = $ionicPopup.alert({
        title: 'Success!',
        template: 'Event was added to your calendar!'
      });
      deferred.resolve(1);
    }).catch(function(error) {
      var addError = $ionic.Popup.alert({
        title: 'Error!',
        template: 'There was a problem adding the event to your calendar!'
      });
      deferred.resolve(0);
    });
  }

  return {
    add: addEvent
  };
});
