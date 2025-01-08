import { Request, Response } from "express";
import { shareLinkSchema } from "../zod/link.schema";
import { Link } from "../models/brain.model";
import { Content } from "../models/content.model";
import { Types } from "mongoose";
import {UserModelInterface} from "../models/user.model"


export const shareBrain = async (req : Request, res : Response) : Promise<any> =>{
    const {success, error, data} = shareLinkSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            success : false,
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
            success : true,
            message : "Link created Successfully",
            link : existingLink!.hash
        });
    }else{
        if(existingLink){
            await Link.deleteOne({userId : existingLink.userId});
        }
        return res.status(200).json({
            success : true,
            message : "Link deleted successfully",
        });
    }
};

export const getSharedBrain = async(req : Request, res : Response) : Promise<any> => {
    const {shareLink} = req.params;
    const link = await Link.findOne({hash : shareLink}).populate('userId');
    if(!link){
        return res.status(404).json({
            success : false,
            message : "Share link is invalid | Sharing is disabled"
        })
    }else{
        const { username } = link?.userId as UserModelInterface;
        const content = await Content.find({userId : link.userId}).populate('tags', 'title -_id').sort({createdAt : -1});
        return res.status(200).json({
            success : true,
            message : "Content found successfully",
            username,
            data : content
        }); 
    }
};

export const getAllSharedBrains = async(req : Request, res : Response) : Promise<any> => {
    const sharedBrains = await Link.find().populate('userId').sort({ createdAt : -1 });
    res.status(200).json({
        success : true,
        message : "Shared links fetched successfully",
        data : sharedBrains
    });
};