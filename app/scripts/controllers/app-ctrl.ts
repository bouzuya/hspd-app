/// <reference path="../../../typings/angularjs/angular.d.ts" />

export class AppCtrl {
  static $inject = [
    '$http'
  ];

  message: string;
  scripts: Array<{}>;

  constructor($http: ng.IHttpService) {
    this.message = 'now loading'
    this.scripts = [];

    $http.get<Array<{}>>('https://hspd-api.herokuapp.com/hubot_scripts')
    .then((res) => {
      this.message = 'loaded';
      this.scripts = res.data;
    });
  }
}
