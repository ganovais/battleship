import { Router } from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import { PositionController } from "../controller/position.controller";
import { PositionService } from "../services/position.service";

const positionService = new PositionService();
const positionController = new PositionController(positionService);
const positionRoutes = Router();

positionRoutes.get("/", ensureAuthenticated, (req, res) =>
   positionController.getAllByUser(req, res)
);
positionRoutes.get("/attacks", ensureAuthenticated, (req, res) =>
   positionController.getAttacks(req, res)
);
positionRoutes.post("/", ensureAuthenticated, (req, res) =>
   positionController.create(req, res)
);
positionRoutes.post("/attack", ensureAuthenticated, (req, res) =>
   positionController.attack(req, res)
);

export default positionRoutes;
