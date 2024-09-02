import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { loginSchema } from "./lib/zod-schemas";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          let user = null;

          // Validate the data server-side
          const { data, success } = await loginSchema.safeParse(credentials);

          if (!success) {
            throw new Error("Invalid credentials");
          }
          const { email, password } = data;

          // logic to verify if the user exists
          user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          // logic to compare the hashed password
          const isValid = await bcrypt.compare(data.password, user.password);

          if (!isValid) {
            throw new Error("Incorrect password");
          }

          // return JSON object with the user data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          } else {
            throw error;
          }
        }
      },
    }),
  ],
} as NextAuthConfig;
