import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors";
import mongoose, { AnyArray } from "mongoose";
dotenv.config();
import mainRouter from "./routes"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin : ["http://localhost:5173"],
    methods : ["GET", "POST","PUT", "DELETE"]
}));
// app.use(cors());
app.use(express.json());
app.use('/api/v1', mainRouter);

mongoose.connect(process.env.DB_URI as string)
.then(()=>console.log('DB connected'))
.catch(()=>process.exit(1));

app.use((err : ErrorRequestHandler, req : Request, res : Response, next : NextFunction) : void  => {
    console.log(err);
    res.status(500).json({
        messsage : "Internal Server Error"
    });
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});