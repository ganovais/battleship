import angular from "angular";

angular.module("app").controller("LoginController", [
   "$scope",
   function ($scope) {
      console.log("sim");
      $scope.name = "Gabriel Novais";
   },
]);
