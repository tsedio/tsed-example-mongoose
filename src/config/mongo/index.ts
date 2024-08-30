import {MongooseConnectionOptions} from "@tsed/mongoose";

export const mongooseConfig: MongooseConnectionOptions[] = [
  {
    id: "default",
    url: "mongodb://localhost:27017/db-test",
  }
];