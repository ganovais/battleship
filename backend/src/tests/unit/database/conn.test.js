import { expect } from "chai";
import { dbConnection, makeConnection } from "../../../database/conn";

describe("Test connection with database", () => {
   before(async () => {
      await makeConnection();
   });

   it("should be able to check connection", async () => {
      const db = dbConnection;

      expect(db).to.not.be.null;
   });
});
