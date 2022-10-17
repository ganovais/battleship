import { dbConnection } from "../database/conn";

const userModelDB = () => dbConnection.collection("users");
export default userModelDB;
