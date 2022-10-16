import angular from "angular";
import playSVG from "../../assets/play.svg";
import api from "../../services/api";

angular.module("app").controller("LoginController", [
   "$scope",
   "$location",
   function ($scope, $location) {
      $scope.playSVG = playSVG;
      $scope.name = "";
      $scope.makeLogin = async () => {
         if ($scope.name) {
            // const token = await api.post("/users", { name: $scope.name });
            $location.path("/home");
            // console.log(token);
         }
      };
   },
]);
