import { model, Schema } from "mongoose";
import { hash, compare } from "bcryptjs";
const UserSchema = new Schema({
    username : {
        type : String,
        required : [true, "Username is required"],
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    }
});

UserSchema.pre('save', async function(next){
    try{
        if(this.isModified('password')){
            const saltRounds = 10;
            this.password = await hash(this.password, saltRounds);
        }
        next();
    }catch(error){
        next(error as Error);
    }  
});

UserSchema.methods.validate = async function(password : string) {
    return await compare(password, this.password);
};

export const User = model('Users', UserSchema);