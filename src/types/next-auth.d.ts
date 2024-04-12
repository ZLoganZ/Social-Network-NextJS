import NextAuth, { DefaultUser, DefaultSession, JWT as DefaultJWT } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    id: string;
    picture: string;
    access_token: string;
    refresh_token: string;
    access_token_github?: string;
  }
  interface User extends DefaultUser {
    id: string;
    access_token: string;
    refresh_token: string;
    access_token_github?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    access_token: string;
    access_token_expiry: number;
    refresh_token: string;
    error: string;
  }
}
