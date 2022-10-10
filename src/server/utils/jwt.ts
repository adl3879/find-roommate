import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";

export const signJwtToken = async (
  payload: User,
  expiresIn: string
): Promise<string> => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
};

export const decodeJwtToken = async (token: string): Promise<User> => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as User;
};
