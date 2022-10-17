import { dbConnection } from "../database/conn";

const hitModelDB = () => dbConnection.collection("hits");
export default hitModelDB;
