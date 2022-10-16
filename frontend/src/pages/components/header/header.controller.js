import angular from "angular";

angular.module("app").controller("HeaderController", [
   "$scope",
   function ($scope) {
      $scope.user = localStorage.getItem("battleship@user");
      $scope.teste = "Gabriel Novais";
   },
]);
