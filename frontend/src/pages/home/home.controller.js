import angular from "angular";
import moveSVG from "../../assets/move.svg";
import api from "../../services/api";

angular.module("app").controller("HomeController", [
   "$scope",
   function ($scope) {
      const sizeBoard = 121; //11*11
      const marginRight = [11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121];
      $scope.moveSVG = moveSVG;
      $scope.startedGame = false;
      $scope.direction = "horizontal";
      const ships = [
         {
            id: 1,
            class: "aircraft-carrier",
            label: "Porta Aviões",
            size: 5,
            indexStart: 0,
            indexEnd: 0,
            direction: "horizontal",
         },
         {
            id: 2,
            class: "battleship",
            label: "Encouraçado",
            size: 4,
            indexStart: 0,
            indexEnd: 0,
            direction: "horizontal",
         },
         {
            id: 3,
            class: "submarine",
            label: "Submarino",
            size: 3,
            indexStart: 0,
            indexEnd: 0,
            direction: "horizontal",
         },
         {
            id: 4,
            class: "destroyer",
            label: "Destroyer",
            size: 3,
            indexStart: 0,
            indexEnd: 0,
            direction: "horizontal",
         },
         {
            id: 5,
            class: "patrol-boat",
            label: "Barco de patrulha",
            size: 2,
            indexStart: 0,
            indexEnd: 0,
            direction: "horizontal",
         },
      ];
      const shipsPlaced = [];
      $scope.columnName = [{ index: 11, name: "a" }];
      $scope.boardPositions = [...Array(sizeBoard).keys()];

      $scope.numberToLetter = (number) => {
         return String.fromCharCode(number / 11 + 64);
      };

      $scope.allowDrop = (ev) => {
         ev.preventDefault();
      };

      $scope.drag = (ev) => {
         let target = ev.target;
         if (target.nodeName == "IMG") {
            target = ev.target.parentElement;
         }
         ev.dataTransfer.setData("text", target.id);
      };

      $scope.getShips = () => ships;

      function validateIfAddShip(elementMoving, index) {
         let blockAddShip = false;
         let indexVertical = index;
         for (let i = 0; i < elementMoving.size; i++) {
            if ($scope.direction == "horizontal") {
               const block = marginRight.some((item) => index + i === item);
               if (block) {
                  blockAddShip = true;
               }
               const position = document.querySelector(
                  `[data-index="${index + i}"]`
               );
               if (position.classList.contains("selected")) {
                  blockAddShip = true;
               }
            } else {
               if (index + (11 * elementMoving.size - 11) > 120) {
                  blockAddShip = true;
               }
               const position = document.querySelector(
                  `[data-index="${indexVertical}"]`
               );
               if (position.classList.contains("selected")) {
                  blockAddShip = true;
               }
               indexVertical = indexVertical + 11;
            }
         }
         return blockAddShip;
      }

      function addShip(elementMoving, index) {
         let indexHelper = index;
         const list = document.getElementsByClassName(
            `selected ${elementMoving.class}`
         );

         if (list.length) {
            Array.from(list).forEach((item) =>
               item.classList.remove("selected", elementMoving.class)
            );
         }
         for (let i = 0; i < elementMoving.size; i++) {
            if ($scope.direction == "horizontal") {
               indexHelper = index + i;
               const position = document.querySelector(
                  `[data-index="${indexHelper}"]`
               );
               position.classList.add("selected", elementMoving.class);
            } else {
               const position = document.querySelector(
                  `[data-index="${indexHelper}"]`
               );
               position.classList.add("selected", elementMoving.class);
               indexHelper = indexHelper + 11;
            }
         }
         elementMoving.indexStart = index;
         elementMoving.indexEnd = indexHelper;
         elementMoving.direction = $scope.direction;
      }

      $scope.drop = (ev) => {
         let element = ev.target;
         if (element.nodeName == "P") {
            element = ev.target.parentElement;
         }
         const index = Number(element.dataset.index);
         if (index && (index < 11 || index % 11 == 0)) {
            return false;
         }
         ev.preventDefault();
         var data = ev.dataTransfer.getData("text");
         const elementMoving = ships.find((item) => item.id === Number(data));

         const blockAddShip = validateIfAddShip(elementMoving, index);

         if (!blockAddShip) {
            addShip(elementMoving, index);
            ev.target.appendChild(document.getElementById(data));
            const shipIndex = ships.findIndex((item) => item.id === Number(data));
            ships.splice(shipIndex, 1);
            shipsPlaced.push(elementMoving);
         }
         $scope.$apply();
      };

      $scope.startGame = async () => {
         const valid = ships.every((item) => item.indexEnd != 0);
         if (!valid) {
            alert("Posicione todos seus navios no campo de batalha");
            return;
         }
         const response = await api.post('/battleship', { shipsPlaced });
         $scope.startedGame = true;
         console.log("valid");
      };
   },
]);
