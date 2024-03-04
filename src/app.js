import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';   

const app = express();


app.use(cors({
    orgin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(cookieParser());

//ROUTES COME HERE BABYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY

//importing routes
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter);

export  { app }