import React, {  useRef, useState } from 'react';
import ErrorModal from "../Components/UI/ErrorModal";
import "./AuthForm.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../Store/auth";


const AuthForm = () => {
  const [isLogin,setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState(null);

  const dispatch = useDispatch();
  const navigate =useNavigate();  
  const passwordRef = useRef("");
  const emailRef = useRef("");
  const confirmPassRef = useRef("");

  const switchAuthModeHandler=()=>{
    setIsLogin((prevState)=> !prevState);
  };
  const closeErrorHandler=()=>{
    setError(null);
  };

  const validateInputs =(password, confirmPass, Login)=>{
     if(Login && password.trim().length<6){
      return{
        title: "Invalid input",
        message:"Please enter a password with a minimum of 6 characters",
      }
     }
     if(!Login && password.trim().length<6){
      return{
        title:"Invalid password",
        message:"Please enter a password with a minimum of 6 characters",
      }
     }
     if(!Login && password !== confirmPass){
      return{
        title:"Invalid password",
        message:"Password should be the same as confirm password",
      }
     };
  } 
  const formSubmitHandler = async (event)=>{
    event.preventDefault();

    const  enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPass = confirmPassRef.current.value;
    
    const inputError = validateInputs(
      enteredPassword,
      enteredConfirmPass,
      isLogin 
    );
    if(inputError){
      setError(inputError);
      return;
    }
    closeErrorHandler();
    setIsLoading(true);
    try{
      let url;
      if(isLogin){
        url =  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRLO00hJ5etUWEEIWrl2co5zDEvbP7CQ4";
      } else{
        url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRLO00hJ5etUWEEIWrl2co5zDEvbP7CQ4";   
      }
      const response = await fetch(url,{
        method:"POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers:{"Content-Type":"application/json"},
      });
      if(!response.ok){
        let errorMessage = "Authentication Failed!";
        throw new Error(errorMessage);
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.idToken);
      dispatch(authActions.login({bearerToken: data.idToken, userId: data.localId}))
      navigate("/");
      navigate(0);
    } catch(error){
      alert(error.message);
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <div>
        <section className='authForm'>
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            onConfirm={closeErrorHandler}
          />
        )}
        <h1 className="heading">{isLogin ? "LogIn" : "SignUp"}</h1>
        <form onSubmit={formSubmitHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" ref={emailRef} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" ref={passwordRef} required />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirmPass"> Confirm password</label>
              <input
                id="confirmPass"
                type="password"
                ref={confirmPassRef}
                required
              />
            </div>
          )}
                    {!isLoading && (<button type="submit">{isLogin ? "LogIn" : "Create Account"}</button>)}
                    {isLoading && <p>Sending Request...</p>}
                    <Link to="/verifyPasswordChange">Forgot Password</Link>
        </form>
        <button
          className="switch"
          type="button"
          onClick={switchAuthModeHandler}
        >
          {isLogin ? "Don't have Account? SignUp" : "Have an Account? Login"}
        </button>
      </section>
    </div>
  );
    
}

export default AuthForm;