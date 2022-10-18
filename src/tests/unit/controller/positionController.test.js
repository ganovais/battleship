import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import { makeConnection } from "../../../database/conn";
import { PositionController } from "../../../controller/position.controller";
import { PositionService } from "../../../services/position.service";

const expect = chai.expect;
chai.use(sinonChai);

describe("Test positionController", () => {
   let positionController = null;
   let positionService = null;
   const res = {};
   res.status = sinon.stub().returns(res);
   res.json = sinon.stub().returns();

   before(async () => {
      await makeConnection();
      positionService = new PositionService();
      positionController = new PositionController(positionService);
   });

   it("should be able to create a new position", async () => {
      const req = {
         body: {
            shipsPlaced: [],
         },
      };
      sinon.stub(positionService, "create").resolves(null);

      await positionController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ message: "ok" });
   });

   it("should be able to get all positions marked by user", async () => {
      const req = {
         body: {
            index: 87,
         },
      };
      sinon.stub(positionService, "attack").resolves(true);

      await positionController.attack(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ hit: true });
   });

   it("should be able to get all positions marked by user", async () => {
      const req = { };
      sinon.stub(positionService, "getAttacks").resolves([]);

      await positionController.getAttacks(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({attacks: []});
   });
});
