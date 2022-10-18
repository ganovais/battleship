import angular from "angular";
import playSVG from "../../assets/play.svg";
import api from "../../services/api";

angular.module("app").controller("LoginController", [
   "$scope",
   "$location",
   function ($scope, $location) {
      $scope.playSVG = playSVG;
      $scope.name = "";
      
      async function clearData() {
         localStorage.removeItem("battleship@user");
         localStorage.removeItem("battleship@positions");
         await api.delete('/users/data');
      }
      $scope.makeLogin = async () => {
         if ($scope.name) {
            const { data } = await api.post("/users", { name: $scope.name });
            localStorage.setItem("battleship@user", JSON.stringify(data.user));
            api.defaults.headers.common['x-api-user'] = data.user.id;
            $location.path("/home");
            $scope.$apply();
         }
      };

      clearData()
   },
]);
