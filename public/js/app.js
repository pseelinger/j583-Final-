var app = angular.module('myApp', []);

app.directive('tab', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div role="tabpanel" ng-transclude ng-show="active"></div>',
    scope: {
    heading: '@'
    },
    require: '^tabset',
    link: function(scope, elem, attr, tabsetCtrl) {
      scope.active = false
  tabsetCtrl.addTab(scope)
    }
  }
});
app.directive('tabset', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: { },
    templateUrl: 'tabset.html',
    bindToController: true,
    controllerAs: 'tabset',
    controller: function() {
      var self = this
      self.tabs = []
      self.addTab = function addTab(tab) {
      self.tabs.push(tab)
      if(self.tabs.length === 1) {
    tab.active = true
  }
    }
    self.select = function(selectedTab) {
  angular.forEach(self.tabs, function(tab) {
    if(tab.active && tab !== selectedTab) {
      tab.active = false;
    }
  })

  selectedTab.active = true;
}
  }
}
});

app.controller('TableController', ['$http', function($http){

  var _this = this;
  $http.get('/js/politicalKnowledge.json')
  .success(function(data){
    console.log(data);
    console.log(this);
    _this.knowledge = data;
  })
  .error(function(msg){
    console.log("Beep boop, something went wrong: \n" + msg);
  });

}]);
