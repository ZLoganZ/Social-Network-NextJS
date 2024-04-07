import NextAuth, { DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: string;
    name: string;
    email: string;
    image: string;
    access_token: string;
    refresh_token: string;
    user: User;
  }
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    access_token: string;
    refresh_token: string;
  }
}

// declare module 'next-auth/jwt' {
//   interface JWT {
//     access_token: string;
//     access_token_expiry: number;
//     refresh_token: string;
//     error: string;
//   }
// }
