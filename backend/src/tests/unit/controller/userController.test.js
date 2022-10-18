import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import { makeConnection } from "../../../database/conn";
import { UserController } from "../../../controller/user.controller";
import { UserService } from "../../../services/user.service";

const expect = chai.expect;
chai.use(sinonChai);

const mockNewUser = {
   id: 1,
   name: "Gabriel N",
};
describe("Test userController", () => {
   let userController = null;
   let userService = null;
   const res = {};
   res.status = sinon.stub().returns(res);
   res.json = sinon.stub().returns();

   before(async () => {
      await makeConnection();
      userService = new UserService();
      userController = new UserController(userService);
   });

   it("should be able to create a new user", async () => {
      const req = {
         body: {
            name: "Gabriel N",
         },
      };
      sinon.stub(userService, "create").resolves(mockNewUser);

      await userController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ user: mockNewUser });
   });

   it("should be able to drop the database", async () => {
      const req = {};
      sinon.stub(userService, "dropCollections").resolves(null);

      await userController.dropCollections(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: "ok" });
   });
});
