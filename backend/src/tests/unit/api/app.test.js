import { expect } from "chai";
import { Server } from 'http'
import server from "../../../api/app";

describe("Test connection with server", () => {
   it("should be able to check app typeof", async () => {
      expect(server).to.be.an.instanceof(Server);
   });
});
