import { Request, Response } from "express";
import { ContentSchema, deleteContentSchema } from "../zod/content.schema";
import { Tag } from "../models/tag.model";
import { Content } from "../models/content.model";
import { Types } from "mongoose";

export const createContent = async (req : Request, res : Response) : Promise<any> => {
    const {success, error, data} = ContentSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            success : false,
            message : error?.issues[0].message,
            path : error?.issues[0].path
        });
    }
    const {type, link, title, tags, content} = data;
    let allTagTitles : Types.ObjectId[]= [];
    if(tags?.length){
        const existingTags = await Tag.find({title : {$in : tags}}); 
        const existingTagTitles = existingTags.map(tag => tag.title);
        const newTagTitles = tags.filter(tagTitle => !existingTagTitles.includes(tagTitle));
        const newTags = await Tag.insertMany(newTagTitles.map(title => ({ title })));
        allTagTitles  = [
            ...existingTags.map(tag => tag._id),
            ...newTags.map(tag => tag._id)
        ];
    }
    const userId : string = req.userId!;
    const newContent = await Content.create({title, type, link, content, tags : allTagTitles, userId});
    return res.status(200).json({
        success : true,
        message : "Content Created Successfully",
        data : newContent
    });
}

export const deleteContent = async (req : Request, res : Response) : Promise<any> => {
    const {success, error, data} = deleteContentSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            success : false,
            message : error?.issues[0].message,
            path : error?.issues[0].path
        });
    }
    const { contentId } = data;
    const userId = req.userId;
    const content = await Content.findOne({_id : contentId});
    if(!content){
        return res.status(404).json({
            success : false,
            message : "Content does exist [Invalid contentId]"
        });
    }
    if(content.userId.toHexString() !== userId){
        return res.status(401).json({
            success : false,
            message : "User is not authorized to delete the content"
        });
    }
    await Content.deleteOne({_id : contentId, userId})
    return res.status(200).json({
        success : true,
        message : "Content deleted Succesfully"
    });  
};

export const fetchContent = async(req : Request, res : Response) : Promise<any> => {
    const userId = req.userId;
    const allContent = await Content.find({userId}).populate('tags', 'title -_id').sort({createdAt : -1});
    return res.status(200).json({
        success : true,
        data : allContent
    });
};