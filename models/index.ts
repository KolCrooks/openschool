import { connect, Connection, createConnection } from "mongoose";
import "./course";
import "./problem";
import "./unit";
import "./user";
import "./video";

if (!process.env.mongodb) throw new Error("No MongoDB URI set!");

connect(process.env.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
