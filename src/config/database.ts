import { Db, MongoClient } from "mongodb";

export namespace DataBase {
  export namespace Mongo {
    export const uri = process.env.SUAMUSICA_SJDT_MONGODB_URI;
  }
};

export default DataBase;