import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../models/user";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId:
        "971809593451-vfefiit0ubaqnjbepmshq89vfcd9bjhr.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: false,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async session(session, token) {
      console.log(session, token);
      if (!session.user?.email) return session;

      let u = await User.findOne({ email: session.user?.email });
      if (!u) u = await User.create({ email: session.user.email });
      session.user = u;

      return session;
    },
  },
});
