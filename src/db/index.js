import mongoose from "mongoose";

const { MONGO_URL } = process.env;
// const MONGO_URL = process.env.MONGO_URL;

const connect_mongo_db = () => {
  mongoose.connect(MONGO_URL);
  mongoose.connection.on("connected", () => {
    console.log("Mongo_DB established conn");
  });
  mongoose.connection.on("error", (error) => {
    console.log("Mongo error :" + error);
  });
};

export default connect_mongo_db;
