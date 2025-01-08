import {Request, Response} from "express";
import { SignupSchema, SigninSchema } from "../zod/user.schema";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req : Request, res : Response) : Promise<any> =>{
    const {success, data, error} = SignupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            success : false,
            message : error?.issues[0].message
        });   
    }
    const {username, password} = data || {};
    let user= await User.findOne({username});
    if(user){
        return res.status(403).json({
            success : false,
            message : "User already exists with this name"
        });
    }
    user = new User({username, password});
    user.password = await user.createHash(user.password);
    await user.save();
    return res.status(200).json({
        success : true,
        message: "Signed up",
        data : user
    });
};

export const signin = async(req : Request, res : Response) : Promise<any> =>{
    const {success, data, error} = SigninSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            success : false,
            message : error?.issues[0].message
        });
    }
    const {username, password} = data || {};
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({
            success : false,
            message : "User does not exist"
        });
    }
    if(await user.validatePassword(password)){
        const token = jwt.sign({userId : user._id}, JWT_SECRET, {expiresIn : '1h'});
        return res.status(200).json({
            success : true,
            message : "Signed In",
            data : token
        });
    }else{
        return res.status(411).json({
            success : false,
            message : "Incorrect Password"
        });
    }
};

export const signout = async(req : Request, res : Response) : Promise<any> =>{
    return res.status(200).json({
        success : true,
        message : "Successfully signed out",
        data : ""
    });
};

export const checkAuth = async (req: any, res: any) => {
    res.status(200).json({
        success: true,
        isAuthenticated: true,
        message: "User is authenticated",
    });
  };