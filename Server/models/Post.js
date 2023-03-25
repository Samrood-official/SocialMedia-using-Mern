import { Schema, model } from 'mongoose'

const postSchema = Schema({
    user:{
        type:Schema.Types.ObjectId,
        // required:true
    },
    title:{
        type:String,
        required:true
    },      
    image:{
        type:String,
    },
    video:{
        type:String,
    },
    like:{
        type:Array,
    },
    // dislike:{
    //     type:Array
    // },
    comments:[
        {
            user:{
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
})

export default model("posts",postSchema)