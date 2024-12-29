import { Schema, model } from "mongoose";

const linkModelSchema = new Schema({
    hash : {
        type : String,
        unique : true,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        unique : true, 
        required : true
    }
});

export const Link = model('Links', linkModelSchema);