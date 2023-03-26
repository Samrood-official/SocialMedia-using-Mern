import {Schema,model} from 'mongoose';

const userSchema = Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
    },
    profilePic:{
        type:String
    },
    followings:{
        type:Array,
    },
    follwers:{
        type:Array
    },
    profile:{
        type:String
    },
    verified:{
        type:Boolean,
        default:false,
        required:true
    }
})

export default model("users",userSchema)