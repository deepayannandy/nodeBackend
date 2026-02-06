import mongoose from "mongoose";

const { connect, connection } = mongoose;

const connectDb = (uri: string) => {
  //   console.info("Connecting with", uri);
  const db = connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database!"));
  return connect(uri);
};

export default connectDb;
