import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import { useSelector } from 'react-redux';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ForgottPassword from './Pages/ForgottPassword/ForgottPassword';

function App() {
  const userDetails = useSelector((state) => state.user)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={userDetails && userDetails?.verified === true ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/verifyEmail/:id' element={<VerifyEmail />} ></Route>
          <Route path='/resetPassword' element={<ResetPassword />} ></Route>
          <Route path='/forgottPassword' element={<ForgottPassword />}></Route>
          <Route path='/success' element={<div className='text-3xl font-bold p-48 text-green-300'>check your email </div>} ></Route>
          <Route path='*' element={<div className='p-96 text-3xl font-bold'> Bad Request<br />404 found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
