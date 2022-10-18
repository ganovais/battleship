import { expect } from "chai";

import { makeConnection } from "../../../database/conn";
import { UserService } from "../../../services/user.service";
import { ObjectId } from "mongodb";

describe("Test userService", () => {
   let userService = null;

   before(async () => {
      await makeConnection();
      userService = new UserService();
   });

   it("should be able to create a new user", async () => {
      const name = "Gabriel Novais";

      const user = await userService.create(name);

      expect(user.name).to.equal(name);
      expect(user.id).to.be.an.instanceof(ObjectId);
   });
});
