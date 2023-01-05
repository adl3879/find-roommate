import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../trpc";
import { createHash, verifyHash } from "../utils/hash";
import { signJwtToken } from "../utils/jwt";

export const userRouter = t.router({
  register: t.procedure
    .input(
      z.object({
        name: z.string().min(2).trim(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string().optional(),
        gender: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let user: User | null;

      user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (user !== null) {
        throw new TRPCError({
          message: "User with this email is already exists",
          code: "CONFLICT",
        });
      }

      // hash password before saving to db - security is important
      const hashedPassword = await createHash(input.password);

      user = await ctx.prisma.user.create({
        data: {
          ...input,
          password: hashedPassword,
        },
      });

      // sign jwt token
      const token = await signJwtToken(user, "7d");

      return {
        success: true,
        user,
        token,
      };
    }),

  login: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let user: User | null;

      user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (user === null) {
        throw new TRPCError({
          message: "User with this email address does not exist",
          code: "NOT_FOUND",
        });
      }
      // check if signup strategy is by email - has password
      if (user.password === null) {
        throw new TRPCError({
          message: "Please try another log in method",
          code: "BAD_REQUEST",
        });
      }

      const passwordIsValid = await verifyHash(input.password, user.password);
      if (!passwordIsValid) {
        throw new TRPCError({
          message: "Password is not corrrect, try again",
          code: "FORBIDDEN",
        });
      }

      const token = await signJwtToken(user, "7d");

      return {
        success: true,
        user,
        token,
      };
    }),
});
