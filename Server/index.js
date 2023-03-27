import express, { json } from 'express'
const app = express()
import { connect } from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
dotenv.config()
import userRouter from './routes/userRoutes.js'

connect(process.env.MONGO_URL).then(() => {
    console.log("mongoose connected",);    
}).catch((err) => {
    console.log("mongoose url error", err);
})

app.use(cors())
app.use(json())
app.use(bodyParser.json({ limit: "30mb", extended: true }));  
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/api', userRouter)


app.listen(3001, () => {
    console.log('server running succesfully');
}) 