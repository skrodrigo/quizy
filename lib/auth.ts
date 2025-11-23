import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  plugins: [nextCookies()],

  emailAndPassword: {
    enabled: true,
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
