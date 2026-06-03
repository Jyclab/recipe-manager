import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Next.js 16: middleware.ts is renamed to proxy.ts
// Runs on Node.js runtime by default (not Edge), so pg/bcrypt work fine
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
