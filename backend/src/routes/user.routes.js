import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { UserService } from "../services/user.service";

const userService = new UserService();
const userController = new UserController(userService);
const userRoutes = Router();

userRoutes.post("/", (req, res) => userController.create(req, res));

export default userRoutes;
