import angular from "angular";
import api from "../../../services/api";

angular.module("app").controller("HeaderController", [
   "$scope", "$location",
   function ($scope, $location) {
      const user = JSON.parse(localStorage.getItem("battleship@user"));
      if(user && user.id) {
         api.defaults.headers.common['x-api-user'] = user.id;
      } else {
         $location.path("/login");
      }
  
   }
]);
