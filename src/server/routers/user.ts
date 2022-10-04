import { t } from "../trpc";
import { z } from "zod";

export const userRouter = t.router({
  hello: t.procedure.query(() => {
    // [..]
    return { msg: "hello world!" };
  }),
});
