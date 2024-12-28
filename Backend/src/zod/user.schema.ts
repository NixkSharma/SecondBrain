import z from 'zod';

export const SignupSchema = z.object({
    username : z
        .string()
        .min(3, "Username should be atleast 3 characters long")
        .max(20, "Username must be atmost 20 characters long"),
    password : z
        .string()
        .min(8, "Password should be atleast 8 characters long")
        .max(20, "Password must be atmost 20 characters long")
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })  
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) 
        .regex(/[0-9]/, { message: "Password must contain at least one number" })             
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }), 
    confirmPassword : z.string()
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
        .max(20, "Username must be atmost 20 characters long"),
    password : z
        .string()
        .min(8, "Password should be atleast 8 characters long")
});

export type TSigninSchema = z.infer<typeof SigninSchema>