import "express-async-errors";
import server from "./app";

const PORT = 3000;

server.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
