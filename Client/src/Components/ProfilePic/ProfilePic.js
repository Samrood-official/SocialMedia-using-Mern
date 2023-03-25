import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CameraIcon } from '../../icons/icons';
import { setUserData } from '../../state/userReducer';
import axios from '../../utils/axios';
import { addProfilepPic } from '../../utils/constants'
import Avatar from '../smallComponants/Avatar';
const ProfilePic = () => {
    const [showInput, setShowInput] = useState(false);
    const [oldImageshow, setoldImageshow] = useState(true);
    const [image, setImage] = useState(null);
    const [oldimage, setnewImage] = useState(null);
    const userData = useSelector((state) => state.user)
    const dispatch = useDispatch()
    console.log("userData444444444444444444");
    console.log(userData);
    function handleImageChange(e) {
        const file = e.target.files[0];
        setImage(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setnewImage(reader.result);
        };
    }
    function handleSubmit(e) {
        e.preventDefault();
        setShowInput(false)
        const formData = new FormData();
        formData.append('file', image);
        formData.append('userId', userData._id);
        axios.post(addProfilepPic, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                dispatch(setUserData(response.data))
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <>
            <div className='h-40 overflow-hidden flex justify-center items-center'>
                <img className='w-full h-48' src='https://www.nationsonline.org/gallery/Greece/Acropolis-Athens.jpg' alt='' />
            </div>
            {userData.profilePic ?
                <div className='absolute top-32 left-4'>
                    <div className='w-24 rounded-full overflow-hidden'>
                        <img src={userData.profilePic} alt='profile' />
                    </div>
                </div>
                :
                <div className='absolute top-32 left-4'>
                    <Avatar size={'big'} />
                </div>
            }
            <div onClick={() => setShowInput(true)} className=' absolute top-40 cursor-pointer left-14'>
                <CameraIcon />
            </div>

            {showInput && <div className='absolute top-56 left-5 flex justify-between'>
                <input type="file" onChange={handleImageChange} />
                <button className='font-bold border rounded-lg px-2 bg-gray-600' onClick={handleSubmit}>Submit</button>
            </div>
            }
        </>
    )
}

export default ProfilePic