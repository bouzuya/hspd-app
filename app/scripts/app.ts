/// <reference path="../../typings/angularjs/angular.d.ts" />

angular
.module('app',[])
.controller('AppCtrl', ['$scope', function($scope) {
  $scope.hoge = 'fuga';
}]);
