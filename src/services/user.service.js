import { ObjectId } from "mongodb";
import { AppError } from "../errors/AppError";
import userModelDB from "../models/user.model";
import hitModelDB from "../models/hit.model";
import positionModelDB from "../models/position.model";
import { serverIO } from "../socket";

export class UserService {
   async create(name) {
      if (!name) {
         throw new AppError("Invalid entries. Try again.");
      }

      try {
         const userModel = userModelDB();
         const user = await userModel.insertOne({
            name,
         });

         return { name, id: user.insertedId };
      } catch (error) {
         console.log(error);
      }
   }

   async dropCollections() {
      try {
         const userModel = userModelDB();
         const hitModel = hitModelDB();
         const positionModel = positionModelDB();

         await userModel.deleteMany({});
         await hitModel.deleteMany({});
         await positionModel.deleteMany({});
      } catch (error) {
         console.log(error);
      }
   }

   async logout(userId) {
      try {
         this.dropCollections();
         serverIO.emit('logout', { userId });
      } catch (error) {
         console.log(error);
      }
   }
}
