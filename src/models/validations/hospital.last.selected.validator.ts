import { z } from "zod";

export const hospitalLastSelectedSchemeValidator = z.object({
  userId: z
    .string({
      required_error: "UserId is required",
    })
    .min(1, "UserId must be at least 1 character")
    .max(50, "UserId must be at most 100 characters"),
  hospitalName: z
    .string()
    .min(1, "HospitalName must be at least 1 character")
    .optional(),
});
