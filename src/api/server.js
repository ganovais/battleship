import "express-async-errors";
import 'dotenv/config';
import server from "./app";

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`conectado na porta ${PORT}`));