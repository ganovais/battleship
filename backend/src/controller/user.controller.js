export class UserController {
   constructor(userService) {
      this.userService = userService;
   }
   async create(request, response) {
      const { name } = request.body;

      const user = await this.userService.create(name);

      return response.status(201).send({ user });
   }
}
