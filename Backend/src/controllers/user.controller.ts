import {Request, Response} from "express";
import { SignupSchema, SigninSchema } from "../zod/user.schema";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req : Request, res : Response) : Promise<any> =>{
    const {success, data, error} = SignupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : error?.issues[0].message
        });   
    }
    try{
        const {username, password} = data || {};
        let user= await User.findOne({username});
        if(user){
            return res.status(403).json({
                message : "User already exists with this name"
            });
        }
        user = new User({username, password});
        user.password = await user.createHash(user.password);
        await user.save();
        return res.status(200).json({
            message: "Signed up"
        });
    }catch(e){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

export const signin = async(req : Request, res : Response) : Promise<any> =>{
    const {success, data, error} = SigninSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : error?.issues[0].message
        });
    }
    try{
        const {username, password} = data || {};
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({
                message : "User does not exist"
            });
        }
        if(await user.validatePassword(password)){
            const token = jwt.sign({userId : user._id}, JWT_SECRET, {expiresIn : '1h'});
            return res.status(200).json({
                message : "Signed In",
                token
            });
        }else{
            return res.status(411).json({
                message : "Incorrect Password"
            });
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

