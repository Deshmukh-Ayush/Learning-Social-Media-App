import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters long")
    .max(20, "Username must not exceed the limit of 20 characters")
    .regex(/^[a-zA-z0-9]+$/, "Username must not contain any special characters")


export const emailValidation = z
    .string()
    .min(2, "Email must be 2 characters long")
    .regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, "Not a valid email address")

export const registerSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: z.string().min(6, {message: "Password must be atleast 5 characters"}),
    fullName: z.string().min(4, {message: "Full Name must be 4 characters long or higher"})
})