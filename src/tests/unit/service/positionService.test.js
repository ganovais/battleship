import { expect } from "chai";

import { makeConnection } from "../../../database/conn";
import hitModelDB from "../../../models/hit.model";
import positionModelDB from "../../../models/position.model";
import { PositionService } from "../../../services/position.service";

describe("Test positionService", () => {
   let positionService = null;
   let positionModel = null;
   let hitModel = null;

   before(async () => {
      await makeConnection();
      positionModel = positionModelDB();
      hitModel = hitModelDB();

      await positionModel.deleteMany({});
      await hitModel.deleteMany({});
      positionService = new PositionService();
   });

   it("should be able to create a new position", async () => {
      const data = [
         {
            class: "battleship",
            label: "Encouraçado",
            size: 4,
            indexStart: 23,
            indexEnd: 26,
            direction: "horizontal",
         },
         {
            class: "patrol-boat",
            label: "Barco de patrulha",
            size: 2,
            indexStart: 21,
            indexEnd: 32,
            direction: "vertical",
         },
      ];

      await positionService.create(data, 2);

      const result = await positionModel.find({}).toArray();

      expect(result.length).to.equal(2);
   });

   it("should be able to find a position by the user", async () => {
      const result = await positionService.getAllByUser(2);

      expect(result.length).to.equal(2);
      expect(result[0].class).to.equal("battleship");
   });

   it("should be able to attack in an empty position", async () => {
      const result = await positionService.attack(1, 56);

      expect(result).to.equal(false);
   });

   it("should be able to attack in an position with some ship", async () => {
      const result = await positionService.attack(1, 23);

      expect(result).to.equal(true);
   });

   it("should be able to get all attack", async () => {
      const result = await positionService.getAttacks();

      expect(result.length).to.equal(2);
   });
});
