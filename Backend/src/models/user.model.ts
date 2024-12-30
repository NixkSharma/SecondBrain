import { model, Schema, Document } from "mongoose";
import { hash, compare } from "bcryptjs";

export interface UserModelInterface extends Document{
    username : string,
    password : string,
    createHash(password : string) : Promise<string>,
    validatePassword(password : string) : Promise<boolean>
}

const UserModelSchema : Schema<UserModelInterface> = new Schema({
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

// UserSchema.pre('save', async function(next){
//     try{
//         if(this.isModified('password')){
//             const saltRounds = 10;
//             this.password = await hash(this.password, saltRounds);
//         }
//         next();
//     }catch(error){
//         next(error as Error);
//     }  
// });

UserModelSchema.methods.createHash = async function(password:string) {
    const saltRounds = 10;
    return await hash(password, saltRounds);
}

UserModelSchema.methods.validatePassword = async function(password : string) {
    return await compare(password, this.password);
};

export const User = model<UserModelInterface>('Users', UserModelSchema);