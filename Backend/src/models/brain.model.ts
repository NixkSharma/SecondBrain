import { Schema, model } from "mongoose";
import { hash } from "bcryptjs";

interface ShareLinkInterface extends Document{
    hash : string, 
    userId : Schema.Types.ObjectId,
    createHash(length : number) : string
}

const linkModelSchema = new Schema<ShareLinkInterface>({
    hash : {
        type : String,
        unique : true,
        required : true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'Users',
        unique : true, 
        required : true
    }
});

linkModelSchema.methods.createHash = function(length: number){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const Link = model<ShareLinkInterface>('Links', linkModelSchema);