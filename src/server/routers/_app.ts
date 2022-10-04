import { t } from "../trpc";

import { userRouter } from "./user";

export const appRouter = t.router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
