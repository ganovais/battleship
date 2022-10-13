import angular from "angular";

angular.module("app").controller("HeaderController", [
   "$scope",
   function ($scope) {
      $scope.teste = "Gabriel Novais";
   },
]);
