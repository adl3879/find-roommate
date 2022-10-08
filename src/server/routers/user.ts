import { t } from "../trpc";
import { z } from "zod";

export const userRouter = t.router({
  hello: t.procedure.query(() => {
    // [..]
    return { msg: "hello world!" };
  }),

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
    .mutation(({ input, ctx }) => {
      console.log(ctx.prisma.user.findFirst());
    }),
});
