/// <reference path="../../../typings/angularjs/angular.d.ts" />

export class AppCtrl {
  static $inject = [
    '$http'
  ];

  loaded: boolean;
  scripts: Array<{}>;

  constructor($http: ng.IHttpService) {
    this.loaded = false;
    this.scripts = [];

    $http.get<Array<{}>>('https://hspd-api.herokuapp.com/hubot_scripts')
    .then((res) => {
      this.loaded = true;
      this.scripts = res.data;
    });
  }
}
