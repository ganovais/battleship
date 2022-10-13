import angular from "angular";

angular.module("app").component("appHeader", {
   template: require('./header.template.html'),
   controller: 'HeaderController'
});
