import * as z from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const PostValidation = z.object({
  caption: z
    .string()
    .min(4, { message: "Caption must be at least 4 characters long" }),
  location: z
    .string()
    .min(4, { message: "Location must be at least 4 characters long" }),
  tags: z
    .string()
    .min(4, { message: "Tags must be at least 4 characters long" }),
  file: z.custom((value) => {
    if (value === null) {
      return "Please select an image";
    }
    return undefined;
  }),
});
