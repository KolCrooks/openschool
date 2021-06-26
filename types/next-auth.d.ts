import NextAuth from "next-auth";
import type { IUser } from "../models/user";

declare module "next-auth" {
  interface Session {
    user?: IUser;
  }
}
