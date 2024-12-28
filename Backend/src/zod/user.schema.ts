import z from 'zod';

export const SignupSchema = z.object({
    username : z
        .string()
        .min(3, "Username should be atleast 3 characters long")
        .max(20, "Username should be atleast 3 characters long"),
    password : z
        .string()
        .min(8, "Password should be atleast 8 characters long"),
    confirmPassword : z
        .string()
        .min(8, "Password should be atleast 8 characters long")
}).refine(
    data => data.password === data.confirmPassword,
    {
        message : "Passwords don't match",
        path : ["confirmPassword"]
    }
)

export type TSignupSchema = z.infer<typeof SignupSchema>

export const SigninSchema = z.object({
    username : z
        .string()
        .min(3, "Username should be atleast 3 characters long ")
        .max(20, "Username should be atleast 3 characters long"),
    password : z
        .string()
        .min(8, "Password should be atleast 8 characters long")
});

export type TSigninSchema = z.infer<typeof SigninSchema>