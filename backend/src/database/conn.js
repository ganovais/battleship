const { MongoClient } = require('mongodb');

const connectionString = `mongodb://${process.env.HOST || 'mongodb'}:27017`;
// const connectionString = process.env.DB_URL;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection = null;

async function makeConnection() {
  try {
    await client.connect();
    dbConnection = await client.db('battleship');

    console.log('Connected successfully to server');
  } catch (err) {
    console.log(err);
  }
}

const getDb = () => dbConnection;

module.exports = {
  makeConnection,
  getDb,
};
