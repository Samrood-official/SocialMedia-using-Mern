import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    token:null,
    posts:[]
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            console.log(action.payload.user);
            state.user = action.payload.user
            state.token= action.payload.token
        },
        setUserData:(state,action)=>{
            state.user = action.payload
        },
        setLogout:(state)=>{
            state.user = null
            state.token = null
        },
        setFriends:(state,action)=>{
            if(state.user) {
                state.user.friends = action.payload.friends;
            }else{
                console.error("user friends non-existent :(");
            }
        },
        setPosts:(state, action)=>{
            state.posts = action.payload.posts
        },
        setPost:(state, action)=>{
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.post_id)return action.payload.post;
                return post;
            })
            state.posts = updatedPosts
        }
    }
})

export const {setLogin, setLogout, setPost, setPosts, setFriends, setUserData} = userSlice.actions

export default userSlice;