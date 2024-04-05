import React,{useContext} from 'react';
import AuthForm from './Pages/AuthForm';
import NavBar from './Components/NavBar/NavBar';
import { Route, Redirect,Switch,BrowserRouter as Router} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthContext from "./Store/AuthContext";
import UserProfile from './Pages/UserProfile';
import VerifyPasswordChange from './Pages/VerifyPasswordChange';

const App = () => {
  const authCxt = useContext(AuthContext);
  return (
    <Router>
    <div>
      <NavBar/>

      <Switch>
      
        <Route exact path='/'>{authCxt.isLoggedIn ? <HomePage/> : <Redirect to ='/auth'/>} </Route>
        <Route path='/profile'>{authCxt.isLoggedIn? <UserProfile/> : <Redirect to='/auth'/>}</Route>
        
       {!authCxt.isLoggedIn && (<Route path="/auth"><AuthForm/></Route>)}
       {!authCxt.isLoggedIn && (<Route path="/verifyPasswordChange"><VerifyPasswordChange/></Route>)}
        
        </Switch>
    </div>
    </Router>
  )
}

export default App
