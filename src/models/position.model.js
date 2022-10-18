import { dbConnection } from "../database/conn";

const positionModelDB = () => dbConnection.collection("positions");
export default positionModelDB;
