const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { AppError } = require("../errors/AppError");
const { userModel } = require("../models/user.model");

const findById = async (id) => {
   const user = userModel();
   try {
      const userExists = await user.find(ObjectId(id)).toArray();

      if (userExists && userExists.length) {
         return userExists[0];
      }
   } catch (error) {
      return null;
   }
};

const create = async (name) => {
   if (!name) {
      throw new AppError("Invalid entries. Try again.");
   }

   const user = userModel();
   const { ops: newUser } = await user.insertOne({
      name,
   });

   return newUser[0];
};

const login = async (name) => {
   const token = jwt.sign({}, "e815d71ce6e97fef83815bd851361823", {
      subject: JSON.stringify({
         name,
      }),
   });

   return token;
};

module.exports = {
   create,
   findById,
   login,
};
