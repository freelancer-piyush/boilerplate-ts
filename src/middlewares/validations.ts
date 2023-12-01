import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateData = (
  schema: Joi.ObjectSchema,
  type: "body" | "query" | "params" | "headers" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req?.[type]);

    if (error) {
      const errorMessages: string[] = error?.details?.map(
        (error: any) => error.message as string
      );
      return res.validation("Not a valid Request", errorMessages);
    }
    next();
  };
};
