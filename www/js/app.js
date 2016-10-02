// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'firebase', 'ngCordova', 'app.controllers', 'app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('top');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })

  .state('forgot-pass', {
    url: '/forgot-pass',
    templateUrl: 'templates/forgot-pass.html',
    controller: 'ForgotPassCtrl'
  })

  .state('user-info', {
    url: '/user-info',
    templateUrl: 'templates/user-info.html',
    controller: 'UserInfoCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.bulbs', {
    url: '/bulbs',
    views: {
      'tab-bulbs': {
        templateUrl: 'templates/tab-bulbs.html',
        controller: 'BulbsCtrl'
      }
    }
  })
  
  .state('tab.projects', {
    url: '/projects',
    views: {
      'tab-projects': {
        templateUrl: 'templates/tab-projects.html',
        controller: 'ProjectsCtrl'
      }
    }
  })
  
  .state('tab.search', {
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: 'templates/tab-search.html',
          controller: 'SearchCtrl'
        }
      }
    })

  .state('tab.messenger', {
      url: '/messenger',
      views: {
        'tab-messenger': {
          templateUrl: 'templates/tab-messenger.html',
          controller: 'MsgCtrl'
        }
      }
    })
    .state('tab.user-detail', {
      url: '/messenger/user-detail',
      views: {
        'tab-messenger': {
          templateUrl: 'templates/user-detail.html',
          controller: 'UserDetailCtrl'
        }
      }
    })

  .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('tab.user-update', {
        url: '/account/user-update',
        views: {
          'tab-account': {
            templateUrl: 'templates/user-update.html',
            controller: 'UserUpdateCtrl'
          }
        }
      })
      .state('tab.pass-update', {
        url: '/account/user-update/pass-update',
        views: {
          'tab-account': {
            templateUrl: 'templates/pass-update.html',
            controller: 'PassUpdateCtrl'
          }
        }
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
