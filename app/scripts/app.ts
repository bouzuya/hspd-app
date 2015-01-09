/// <reference path="../../typings/angularjs/angular.d.ts" />

import app_ctrl = require('./controllers/app-ctrl');

angular
.module('app', [])
.controller('AppCtrl', app_ctrl.AppCtrl);
