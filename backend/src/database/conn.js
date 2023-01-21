import { MongoClient } from "mongodb";
import "dotenv/config";

const connectionString = `mongodb://${process.env.HOST || "mongodb"}:27017`;

const client = new MongoClient(connectionString, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

let dbConnection = null;

const makeConnection = async () => {
   try {
      await client.connect();
      dbConnection = client.db(`battleship-${process.env.NODE_ENV}`);

      console.log("Connected successfully to server");
   } catch (err) {
      console.log(err);
   }
};

export { dbConnection, makeConnection };
