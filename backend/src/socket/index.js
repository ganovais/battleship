import { Server } from "socket.io";

let serverIO = null;

function startInstanceSocket(server) {
   const io = new Server(server, {
      cors: {
         origin: "*",
      },
   });

   io.on("connection", (socket) => {
      socket.on("shipSank", function (data) {
         io.emit("shipSankReceive", data);
      });
   });

   serverIO = io;
}

export { serverIO, startInstanceSocket };
