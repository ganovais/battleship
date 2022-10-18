import angular from "angular";
import api from "../../../services/api";

angular.module("app").controller("HeaderController", [
   "$scope",
   "$location",
   "$rootScope",
   function ($scope, $location, $rootScope) {
      $rootScope.$on("checkUser", checkUser);
      $rootScope.$on("clearUserData", clearData);

      function checkUser() {
         const user = JSON.parse(localStorage.getItem("battleship@user"));
         $scope.user = user;
         if (user && user.id) {
            api.defaults.headers.common["x-api-user"] = user.id;
         } else {
            $location.path("/login");
         }
      }

      async function clearData(ev, target) {
         localStorage.removeItem("battleship@user");
         localStorage.removeItem("battleship@positions");
         $scope.user = {};

         if (target && target.owner) {
            await api.post("/users/logout");
            await api.delete("/users/data");
         }
         $location.path("/login");
         $scope.$apply();
      }

      async function logout() {
         const logout = confirm("Deseja realmente sair?");
         if (logout) {
            clearData({}, { owner: true });
         }
      }

      $scope.logout = logout;

      // checkUser();
   },
]);
