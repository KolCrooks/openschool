import { connect, Connection, createConnection } from "mongoose";
import "./course";
import "./problem";
import "./unit";
import "./user";
import "./video";

let cached: Connection | null = null;

export async function connectToDatabase() {
  if (cached) return cached;
  if (!process.env.mongodb) throw new Error("No MongoDB URI set!");

  cached = await createConnection(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return cached;
}
