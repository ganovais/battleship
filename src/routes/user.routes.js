import { Router } from "express";
import { UserController } from "../controller/user.controller";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import { UserService } from "../services/user.service";

const userService = new UserService();
const userController = new UserController(userService);
const userRoutes = Router();

userRoutes.post("/", (req, res) => userController.create(req, res));
userRoutes.post("/logout", ensureAuthenticated, (req, res) =>
   userController.logout(req, res)
);
userRoutes.delete("/data", (req, res) =>
   userController.dropCollections(req, res)
);

export default userRoutes;
