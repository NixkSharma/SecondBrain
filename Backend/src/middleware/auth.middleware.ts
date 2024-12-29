import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
    const token = req.headers['authorization']?.startsWith('Bearer ') ? req.headers['authorization'].split(' ')[1] : undefined;
    if(!token){
        return res.status(401).json({
            message : "Token is invalid/expired"
        });
    }
    try{
        const decodedPayload = verify(token, JWT_SECRET) as JwtPayload;
        req.userId = decodedPayload.userId;
        next();
    }catch(e){
        return res.status(500).json({
            message : "Internal Server Error"
        });
    }
};