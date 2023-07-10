import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { setUser, setToken } from '../../../../redux/authSlice';
import { useDispatch } from 'react-redux';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
});

export { handler as GET, handler as POST };
