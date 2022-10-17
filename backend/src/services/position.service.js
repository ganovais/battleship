import { serverIO } from "../socket";
import positionModelDB from "../models/position.model";
import hitModelDB from "../models/hit.model";

export class PositionService {
   async create(positions, userId) {
      try {
         const positionModel = positionModelDB();
         const promises = positions.map((item) =>
            positionModel.insertOne({
               userId,
               class: item.class,
               label: item.label,
               indexStart: item.indexStart,
               indexEnd: item.indexEnd,
               size: item.size,
               direction: item.direction,
            })
         );
         await Promise.all(promises);
      } catch (error) {
         console.log(error);
      }
   }

   async getAllByUser(userId) {
      try {
         const positionModel = positionModelDB();
         const positions = await positionModel
            .find({
               userId,
            })
            .toArray();
         return positions;
      } catch (error) {
         console.log(error);
      }
   }

   async attack(userId, index) {
      try {
         const positionModel = positionModelDB();
         const positionsHorizontal = await positionModel
            .find({
               direction: "horizontal",
               userId: { $not: { $eq: userId } },
               $and: [
                  { indexEnd: { $gte: index } },
                  { indexStart: { $lte: index } },
               ],
            })
            .toArray();

         const possibilities = [
            index,
            index + 11,
            index + 22,
            index + 33,
            index + 44,
         ];
         const positionsVertical = await positionModel
            .find({
               direction: "vertical",
               userId: { $not: { $eq: userId } },
               $or: [
                  { indexEnd: { $in: possibilities } },
                  { indexStart: { $in: possibilities } },
               ],
            })
            .toArray();

         const hit = positionsVertical.some((item) => {
            var list = [];
            for (var i = item.indexStart; i <= item.indexEnd; i += 11) {
               list.push(i);
            }
            return list.some((item) => item == index);
         });
         const successHit = hit || positionsHorizontal.length != 0;

         const attack = {
            userId,
            index,
            successHit,
         };
         const hitModel = hitModelDB();
         hitModel.insertOne(attack);

         serverIO.emit("receiveAttack", attack);

         return successHit;
      } catch (error) {
         console.log(error);
      }
   }

   async getAttacks() {
      try {
         const hitModel = hitModelDB();
         const attacks = await hitModel.find({}).toArray();
         return attacks;
      } catch (error) {
         console.log(error);
      }
   }
}
