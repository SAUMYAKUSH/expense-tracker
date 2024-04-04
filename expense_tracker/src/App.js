import React,{useContext} from 'react';
import AuthForm from './Pages/AuthForm';
import NavBar from './Components/NavBar/NavBar';
import { Route, Redirect, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthContext from "./Store/AuthContext";

const App = () => {
  const authCxt = useContext(AuthContext);
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={authCxt.isLoggedIn ? <HomePage/> : <Navigate replace to ='/auth'/>} />
        
        
       <Route path='/auth'  element={<AuthForm/>}/>
        </Routes>
    </div>
  )
}

export default App
