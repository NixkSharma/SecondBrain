import { Schema, model } from "mongoose";

const tagModelSchema = new Schema({
    title : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    }
},
    {timestamps : true}
);

export const Tag = model('Tags', tagModelSchema);