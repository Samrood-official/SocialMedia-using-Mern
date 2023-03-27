import { Schema, model } from 'mongoose'

const postSchema = Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    desc:{
        type:String,
        required:false
    },     
    image:{
        type:String,
        required:false
    },
    likes:{
        type:Array,
    },
    comments:[
        {
            userId:{
                type:Schema.Types.ObjectId,
                required:true        
            },
            userName:{
                type:String,
                required:true
            },
            comment:{
                type:String, 
                required:true   
            }
        }
    ]
},{timestamps: true})

export default model("post",postSchema)