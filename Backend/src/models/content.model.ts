import { Schema, model } from "mongoose";
import { Types } from "../enums/types.enum";


const ContentModelSchema = new Schema({
    link : {
        type : String,
    },
    type : {
        type : String,
        enum : Types,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    tags : {
        type : [Schema.Types.ObjectId],
        ref : 'Users'
    }, 
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    }, 
    content : {
        type : String
    }
},
    {timestamps : true}
);

export const Content = model('Content', ContentModelSchema);

