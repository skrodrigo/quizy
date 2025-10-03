import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();
export const auth = betterAuth({

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
