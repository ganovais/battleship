import angular from "angular";
import api from "../../../services/api";

angular.module("app").controller("HeaderController", [
   "$scope",
   "$location",
   function ($scope, $location) {
      const user = JSON.parse(localStorage.getItem("battleship@user"));
      $scope.user = user;
      if (user && user.id) {
         api.defaults.headers.common["x-api-user"] = user.id;
      } else {
         $location.path("/login");
      }

      $scope.logout = async () => {
         const logout = confirm("Deseja realmente sair?");
         if (logout) {
            await api.post("/users/logout");
            $location.path("/login");
            $scope.$apply();
         }
      };
   },
]);
