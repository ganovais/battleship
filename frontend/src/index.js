import angular from "angular";

import "angular-route";
import './style.scss';

const requires = ["ngRoute"];
const app = angular.module("app", requires);

app.config([
   "$routeProvider",
   function ($routeProvider) {
      $routeProvider
         .when("/login", {
            template: require('./pages/login/login.template.html'),
            controller: "LoginController",
         })
         .when("/home", {
            template: require('./pages/home/home.template.html'),
            controller: "HomeController",
         })
         .otherwise("/login");
   },
]);