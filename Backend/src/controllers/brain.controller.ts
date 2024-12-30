import { Request, Response } from "express";
import { shareLinkSchema } from "../zod/link.schema";
import { Link } from "../models/brain.model";


export const shareLink = async (req : Request, res : Response) : Promise<any> =>{
    const {success, error, data} = shareLinkSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : error.issues[0].message,
            path : error.issues[0].path
        });
    }
    const existingLink = await Link.findOne({userId : req.userId});
    if(data.share){
        if(!existingLink){
            const existingLink = new Link({userId : req.userId});
            existingLink.hash = existingLink.createHash(10);
            await existingLink.save();
        }
        return res.status(200).json({
            message : "Link created Successfully",
            link : existingLink!.hash
        });
    }else{
        if(existingLink){
            await Link.deleteOne({userId : existingLink.userId});
        }
        return res.status(200).json({
            message : "Link deleted successfully",
        });
    }
}