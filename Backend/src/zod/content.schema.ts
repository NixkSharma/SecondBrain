import { Types } from "../enums/types.enum";
import { z } from "zod";

export const ContentSchema = z.object({
    type : z
        .nativeEnum(Types)
        .refine(val => Object.values(Types).includes(val),{
            message : `Type should only contain values : ${Object.values(Types).join(', ')}`
        }),
    link : z
        .preprocess(
            val => typeof val === 'string' && val.trim() === "" ? undefined : val,
            z.string().url().optional()
        ),
    content : z
        .string()
        .max(1000, {message : "Content must be atmost 1000 characters"})
        .optional(),
    title : z
        .string()
        .min(10, {message : "Title should contain atleast 10 characters"})
        .max(100, {message : "Title must atmost contain 100 characters"}),
    tags : z
        .array(z.string().trim().toLowerCase().max(20, {message : "Tag must atmost contain 20 characters"}))
        .optional()
});
