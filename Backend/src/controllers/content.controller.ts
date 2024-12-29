import { Request, Response } from "express";
import { ContentSchema } from "../zod/content.schema";
import { Tag } from "../models/tag.model";
import { Content } from "../models/content.model";
import { Types } from "mongoose";

export const createContent = async (req : Request, res : Response) : Promise<any> => {
    const {success, error, data} = ContentSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : error.issues[0].message
        });
    }
    try{
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
            message : "Content Created Successfully",
            newContent
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error"
        });
    }
}
