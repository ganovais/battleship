import { ObjectId } from "mongodb";
import { AppError } from "../errors/AppError";
import userModelDB from "../models/user.model";

export class UserService {
   async findById(id) {
      const userModel = userModelDB();
      try {
         const userExists = await userModel.find(ObjectId(id)).toArray();

         if (userExists && userExists.length) {
            return userExists[0];
         }
      } catch (error) {
         return null;
      }
   }

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
}
