// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      name: string;
      email: string;
      role: string;
    };
  }

  interface JWT {
    role: string;
  }
}
