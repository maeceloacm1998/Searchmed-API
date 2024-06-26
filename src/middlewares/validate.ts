import { StatusCode } from "@models/types/status.code";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
export const validate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      next();
    } catch (error) {
      let err = error;
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
      }
      return res.status(parseInt(StatusCode.Conflict)).json({
        status: StatusCode.Conflict,
        result: err,
      });
    }
  };
