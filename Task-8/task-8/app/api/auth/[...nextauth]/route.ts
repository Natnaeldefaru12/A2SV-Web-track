import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Call the login API endpoint with absolute URL
          const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3003';
          console.log("NextAuth attempting login for:", credentials.email);
          
          const response = await axios.post(`${baseUrl}/api/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const responseData = response.data;
          console.log("NextAuth received response data:", responseData);

          // Extract user data from the nested structure
          const user = responseData.data;
          console.log("NextAuth extracted user data:", user);

          if (user && (user.accessToken || user.token)) {
            return {
              id: user.id || user._id || user.userId,
              name: user.name || user.username,
              email: user.email,
              accessToken: user.accessToken || user.token,
            };
          }

          console.log("No valid user data or token found");
          return null;
        } catch (error) {
          console.error("NextAuth authorize error:", error);
          if (error.response) {
            console.error("NextAuth error response:", error.response.data);
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };