import { Db, MongoClient } from "mongodb";

export namespace Database {
  export namespace Mongo {
    export const uri = process.env.SUAMUSICA_SJDT_MONGODB_URI || '';

    let cachedDb: Db;
    
    export const connectToDataBase = async (uri: string) => {
      if (cachedDb) return cachedDb;
      const url = new URL(uri);

      const client: MongoClient = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).catch((data) => {
        return data;
      });

      const dbName = url.pathname.substr(1);
      const db = client.db(dbName);
      cachedDb = db;
      return db;
    };
  }
};

export default Database;