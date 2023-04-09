import { addFollow, allUsers, getMyPosts, notification, profileUser, unfollow, unFriend } from "../utils/constants";
import { setPost, setUserData } from "./userReducer";
import axios from "../utils/axios";

export const handleFollow = async (friendId, token, setStatus, dispatch) => {
    try {
        const response = await axios.put(addFollow, { friendId }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        const updatedUserData = response.data
        setStatus("following")
        dispatch(setUserData({ user: updatedUserData }))
    } catch (err) {
        console.log("error occurred while handling follow");
    }
}

export const handleUnFollow = (friendId, token, setStatus, dispatch) => {
    try {
        axios.put(unfollow, { unfollowid: friendId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const updatedUserData = response.data
            setStatus("follow")
            dispatch(setUserData({ user: updatedUserData }))
        })
    } catch (err) {
        console.log("error occurred while handling unfollow");
    }
}

export const handleRemoveFollower = async (unfriendId, token, setFollowerStat, dispatch) => {
    try {
        const response = await axios.put(unFriend, { unfriendId: unfriendId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const user = response.data
        return user;
        // dispatch(setUserData({user:user}))
        // setFollowerStat('removed')
    } catch (err) {
        console.log(err);
        console.log("error occurred while handling unfollow");
    }
}

export const fetchMypost = async (token,profileId) => {

    const response = await axios.get(`${getMyPosts}/${profileId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const postData = response.data;
    return postData;
}

export const likePost = async (token, postId, dispatch) => {
    try {
        const response = await axios.put(`/api/posts/${postId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        const data = response.data
        dispatch(setPost({ posts: data }))

    } catch (err) {
        console.log(err);
    }

}

export const getAllusers = async (token) => {
    try {
        const users = await axios.get(allUsers, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return users.data.data;
    } catch (err) {

    }
}
export const getProfileUser = async (token,profileId) => {
    try {
        const user = await axios.get(`${profileUser}/${profileId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(user.data);
        return user.data;
    } catch (err) {

    }
}
export const getNotifications =async (token)=>{
   const response = await axios.get(notification,{
        headers:{
            'Authorization' :`Barear ${token}`
        }
    })
    return response.data
}