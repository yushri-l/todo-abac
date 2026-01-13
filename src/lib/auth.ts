import { betterAuth } from "better-auth";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prisma,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
          },
    },
  },
});
