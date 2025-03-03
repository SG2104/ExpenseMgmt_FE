import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  // .min(3, { message: "Email must be at least 3 characters long" })
  // .max(10, { message: "Email is too long" })
  // .regex(/^[^@]+@[^@]+\.[^@]+$/, { message: "Invalid email format" })
  // .superRefine((email, ctx) => {
  //   const prohibitedChars = /[()<>[\]:;@\\,/" ]/;
  //   const [localPart] = email.split("@");
  //   if (
  //     prohibitedChars.test(localPart) ||
  //     localPart.startsWith(".") ||
  //     localPart.endsWith(".") ||
  //     localPart.includes("..")
  //   ) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: "Email ID contains prohibited characters",
  //     });
  //   }
  // }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Your password must contain at least 8 characters.",
        required_error: "You must fill in this field.",
      })
      .min(6)
      .max(30),
    email: z
      .string({
        required_error:
          "You must fill in your email address to complete registration.",
      })
      .email({
        message: "Please provide a valid email address.",
      }),
    password: z
      .string({
        invalid_type_error: "Your password must contain at least 8 characters.",
        required_error: "You must fill in this field.",
      })
      .min(8),
      confirmPassword: z.string({
      required_error: "You must fill in this field.",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
