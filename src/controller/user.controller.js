export class UserController {
   constructor(userService) {
      this.userService = userService;
   }
   async create(request, response) {
      const { name } = request.body;

      const user = await this.userService.create(name);

      return response.status(201).json({ user });
   }

   async dropCollections(request, response) {
      await this.userService.dropCollections();

      return response.status(200).json({ message: 'ok' });
   }

   async logout(request, response) {
      await this.userService.logout(request.userId);

      return response.status(200).send({ message: 'ok' });
   }
}
