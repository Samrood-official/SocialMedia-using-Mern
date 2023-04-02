import express, { json } from 'express'
const app = express()
import { connect } from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import userRouter from './routes/userRoutes.js'


import { Server } from "socket.io";

const io = new Server({
    cors:{
        origin:'http://localhost:3001'
    }
 });

io.on("connection", (socket) => {
    console.log("connected")
    socket.on('disconnect',()=>{
        console.log('disconnected')
    })
});

io.listen(3000);



dotenv.config()
connect(process.env.MONGO_URL).then(() => {
    console.log("mongoose connected",);
}).catch((err) => {
    console.log("mongoose url error", err);
})
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(json())
app.use(cors())
app.use(morgan('tiny'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/api', userRouter)



app.listen(3001, () => {
    console.log('server running succesfully');
}) 