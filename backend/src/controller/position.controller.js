export class PositionController {
   constructor(positionService) {
      this.positionService = positionService;
   }
   
   async create(request, response) {
      const { shipsPlaced } = request.body;
      await this.positionService.create(shipsPlaced, request.userId);

      return response.status(201).json({ message: "ok" });
   }

   async getAllByUser(request, response) {
      const positions = await this.positionService.getAllByUser(request.userId);
      return response.status(200).json({ positions });
   }

   async attack(request, response) {
      const { index } = request.body;
      const hit = await this.positionService.attack(request.userId, index);
      return response.status(201).json({ hit });
   }

   async getAttacks(request, response) {
      const attacks = await this.positionService.getAttacks();
      return response.status(200).json({ attacks });
   }
}
