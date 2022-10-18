import { AppError } from "../errors/AppError";

export default async function ensureAuthenticated(request, response, next) {
   const authHeader = request.headers["x-api-user"];

   if (!authHeader) {
      throw new AppError("missing auth token", 401);
   }

   request.userId = authHeader;

   next();
}
