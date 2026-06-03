import type { NextAuthConfig } from "next-auth";

// This config is Edge-compatible — no database or Node.js-only imports.
// Used by middleware for session checking only.
export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      const protectedPaths = ["/dashboard", "/recipes/new"];
      const isProtected = protectedPaths.some((path) =>
        pathname.startsWith(path)
      );

      const authPaths = ["/login", "/signup"];
      const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

      if (isProtected && !isLoggedIn) return false;
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
};
