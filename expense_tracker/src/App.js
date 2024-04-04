import React,{useContext} from 'react';
import AuthForm from './Pages/AuthForm';
import NavBar from './Components/NavBar/NavBar';
import { Route, Redirect, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthContext from "./Store/AuthContext";
import UserProfile from './Pages/UserProfile';

const App = () => {
  const authCxt = useContext(AuthContext);
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={authCxt.isLoggedIn ? <HomePage/> : <Navigate replace to ='/auth'/>} />
        <Route path='/profile' element={authCxt.isLoggedIn? <UserProfile/> : <Navigate replace to='/auth'/>}></Route>
        
       {!authCxt.isLoggedIn && <Route path='/auth'  element={<AuthForm/>}/>}
        </Routes>
    </div>
  )
}

export default App
