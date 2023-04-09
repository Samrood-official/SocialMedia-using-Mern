import express, { json } from 'express'
const app = express()
import { connect } from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import userRoute from './routes/userRoutes.js'
import messageRoute from './routes/messages.js'
import chatRoute from './routes/chat.js'
import { createServer } from 'http'
import { Server } from "socket.io";

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

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
app.use('/api', userRoute)
app.use('/api/chats', chatRoute)
app.use('/api/messages', messageRoute)

httpServer.listen(3001, () => {
    console.log('server running succesfully');
}) 

let users = []
const addUser = (userId,socketId) =>{
   !users.some(user=>user.userId === userId) && users.push({userId, socketId})
}
const removeUser = (socketId)=>{
    users = users.filter((user)=>user.socketId !== socketId)
}  
const getUser = (userId)=>{
    return users.find((user) =>{
        return user.userId == userId})
}
console.log("users");
console.log(users);
io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('addUser',(userId)=>{
        addUser(userId,socket.id)
    })
    //get and send messge 
    socket.on('sendMessage',({senderId, recieverId, text})=>{
        const user = getUser(recieverId)
        io.to(user?.socketId).emit('getMessage',({senderId,text})) 

    })
    //disconnect 
    socket.on('disconnect',()=>{ 
        console.log('disconnected')
        removeUser(socket.id)
    })
})

// let users = []
// const addUser = (userName, socketId) => {
//     !users.some(user => user.userName === userName) && users.push({ userName, socketId })
// }
// const getUser = (userName) => {
//     return users.find((user) => user.userName == userName)
// }
// const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId)
// }
// io.on("connection", (socket) => {
//     console.log("socket connected")
//     socket.on('newUser', (userName, socketId) => {
//         addUser(userName, socketId)
//     })
//     io.on('sendNotification',({type, recieverName, senderName, postId })=>{
        
//     })
//     socket.on('disconnect', () => {
//         removeUser(socket.id)
//         console.log('disconnected')
//     })
// });