import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

// const connectionString = `mongodb://${process.env.HOST || "mongodb"}:27017`;
// const connectionString = 'mongodb+srv://ganovais:ganovaismongodb@cluster0.ope2i1f.mongodb.net/?retryWrites=true&w=majority'
// const client = new MongoClient(connectionString, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
// });

const uri =
   "mongodb+srv://ganovais:ganovaismongodb@cluster0.ope2i1f.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverApi: ServerApiVersion.v1,
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
