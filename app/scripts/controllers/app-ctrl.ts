/// <reference path="../../../typings/angularjs/angular.d.ts" />

export class AppCtrl {
  static $inject = [
    '$http'
  ];

  hoge: string;

  constructor($http: ng.IHttpService) {
    this.hoge = 'piyo';

    $http.get('https://hspd-api.herokuapp.com/hubot_scripts');
  }
}
