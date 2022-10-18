import angular from "angular";
import { io } from "socket.io-client";
import moveSVG from "../../assets/move.svg";
import api from "../../services/api";

angular.module("app").controller("HomeController", [
   "$scope",
   function ($scope) {
      const sizeBoard = 121; //11*11
      const marginRight = [11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121];
      const socket = io("http://localhost:3000");
      $scope.moveSVG = moveSVG;
      $scope.startedGame = false;
      $scope.direction = "horizontal";
      let ships = [
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
      let shipsPlaced = [];
      $scope.columnName = [{ index: 11, name: "a" }];
      $scope.boardPositions = [...Array(sizeBoard).keys()];
      const userLogged = JSON.parse(localStorage.getItem("battleship@user"));
      async function checkExistingPositions() {
         const { data } = await api.get("positions");
         const {
            data: { attacks },
         } = await api.get("positions/attacks");

         data.positions.map((item) => addShip(item, item.indexStart));
         ships = [];
         $scope.startedGame = true;
         shipsPlaced = data.positions;
         if (attacks.length) {
            attacks.forEach((item) =>
               setAttack(item.index, item.successHit, item.userId)
            );
         }
         $scope.$apply();
      }

      function startSocket() {
         socket.on("connect", () => {
            console.log(`Socket ${socket.id}`);
         });

         socket.on("logout", (data) => {
            if (data.userId != userLogged.id) {
               alert("Seu adversário abandonou a partida");
            }
         });

         socket.on("receiveAttack", (data) => {
            setAttack(data.index, data.successHit, data.userId);
         });

         socket.on("shipSankReceive", (data) => {
            if (data.userLogged.id != userLogged.id) {
               const currentText = document.querySelector(
                  `.ship-information.${data.ship}`
               ).innerHTML;
               const info = currentText.split(":");
               document.querySelector(
                  `.ship-information.${data.ship}`
               ).innerHTML = `Detonado tamanho: ${info[1]}`;
               if (data.counter === 5) {
                  alert("Você venceu!");
               }
            }
         });

         return () => {
            socket.off("connect");
            socket.off("receiveAttack");
            socket.off("shipSank");
            socket.off("logout");
         };
      }

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
      $scope.getShipsPlaced = () => shipsPlaced;

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
            if (elementMoving.direction == "horizontal") {
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
         if (elementMoving.direction == "vertical") {
            indexHelper = indexHelper - 11;
         }

         elementMoving.indexStart = index;
         elementMoving.indexEnd = indexHelper;
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
         let elementMoving = ships.find((item) => item.id === Number(data));
         if (!elementMoving) {
            elementMoving = shipsPlaced.find(
               (item) => item.id === Number(data)
            );
         }

         const blockAddShip = validateIfAddShip(elementMoving, index);
         elementMoving.direction = $scope.direction;

         if (!blockAddShip) {
            addShip(elementMoving, index);
            ev.target.appendChild(document.getElementById(data));
            const shipIndex = ships.findIndex(
               (item) => item.id === Number(data)
            );
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
         const { data } = await api.post("/positions", { shipsPlaced });
         if (data.message == "ok") {
            $scope.startedGame = true;
            localStorage.setItem("battleship@positions", true);
            Array.from(document.querySelectorAll(".draggable")).map((item) =>
               item.remove()
            );
            $scope.$apply();
         }
      };

      function setAttack(index, hit, userId) {
         let position = null;
         if (userId == userLogged.id) {
            position = document.querySelector(`[data-attack-index="${index}"]`);
         } else {
            position = document.querySelector(`[data-index="${index}"]`);
         }
         const className = hit ? "success-hit" : "lost-hit";
         const div = `<div class="${className}"></div>`;
         position.insertAdjacentHTML("afterbegin", div);
      }

      function checkIfShipwrecked() {
         const ships = [
            "destroyer",
            "aircraft-carrier",
            "battleship",
            "submarine",
            "patrol-boat",
         ];

         let counter = 0;
         ships.forEach((ship) => {
            const shipElements = document.querySelectorAll(
               `.selected.position.${ship}`
            );
            const shipSank = Array.from(shipElements).every(
               (item) => item.firstChild.nodeName === "DIV"
            );
            if (shipSank) {
               counter++;
               socket.emit("shipSank", { ship, userLogged, counter });
            }
         });
      }

      $scope.attack = async (index) => {
         if (index == 0 || (index && (index < 11 || index % 11 == 0))) {
            alert("Escolha uma opção válida");
            return false;
         }
         const { data } = await api.post("/positions/attack", { index });
         setAttack(index, data.hit, userLogged.id);
         checkIfShipwrecked();
      };

      if (localStorage.getItem("battleship@positions")) {
         checkExistingPositions();
         startSocket();
         // checkIfShipwrecked();
      }
   },
]);
