import { compareSync } from "bcryptjs";
import User from "models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "utils/db";

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        // Update the token process
        async jwt({ token, user }) {
            // user: from database
            // token: from next-auth lifecycle
            if(user?._id) token._id = user._id;
            if(user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        // Update the session process
        async session({ session, token }) {
            if(token?._id) session._id = token._id;
            if(token?.isAdmin) session.isAdmin = token.isAdmin;
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({ email: credentials.email });
                await db.disconnect();

                if(user && compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        profile: 'user.profile',
                        isAdmin: user.isAdmin,
                    }
                }

                throw new Error('Invalid email or password');
            }
        })
    ]
});