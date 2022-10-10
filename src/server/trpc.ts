import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
      message:
        error.code === "BAD_REQUEST" && error.cause instanceof ZodError
          ? String(
              JSON.stringify(JSON.parse(error.cause.message)[0]["message"])
            )
          : error.message,
    };
  },
});
