import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../models/user";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session(session, token) {
      if (!session.user?.email) return session;

      let u = await User.findOne({ email: session.user.email });
      if (!u) u = await User.create({ email: session.user.email });
      session.user = u;

      return session;
    },
  },
  debug: true,
});
