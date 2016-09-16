angular.module('app.controllers')
.directive('focus', function() {
  return {
    restrict: 'A',
    link: function($scope, element, attrs) {
      element.bind('keydown', function(e) {
        var partsID = attrs.id.match(/field(\d{1})/);
        var currID = parseInt(partsID[1]);

        var code = e.keyCode || e.which;
        if ( code === 13 ) {
          e.preventDefault();
          document.querySelector('#field' + (currID + 1)).focus();
        }
      });
    }
  }
});
