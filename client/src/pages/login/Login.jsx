import { useContext, useRef } from "react";
//import "./login.css"
import "./login.scss"
import {loginCall} from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext"
import {CircularProgress} from "@material-ui/core"
import {Link} from "react-router-dom"



export default function Login() {

    const email = useRef();
    const password = useRef(); 

    const {user, isFetching, dispatch} = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({email:email.current.value, password:password.current.value}, dispatch)
    }
    console.log(user);

    return (
    <div className="login">
        {/* card */}
        <div className="loginWrapper">
            <div className="loginLeft">
                <h1 >Ratify</h1>
                <span>Rate, what you trust!</span>
                <span>Don't you have an account? <br /> Let's join today! </span>
                <Link to="/register">
                    <button>Register</button>
                </Link>

            </div>

            <div className="loginRight">
                <h1>Login</h1>
                <form onSubmit={handleClick}>
                    <input type="email" placeholder="Email" ref={email} required  />
                    <input type="password" placeholder="Password" ref={password} required minLength="6"/>
                    <button type="submit" disabled={isFetching}>{isFetching ? <CircularProgress/> : "Log In"}</button>
                    <span >Forgot Password?</span>
                    
                </form>
            </div>

        </div>
    </div>
  )
  /*  OLD CSS WITH classnames 
    return (
    <div className="login">

        <div className="loginWrapper">
            <div className="loginLeft">
                <h1 className="loginLogo">Ratify</h1>
                <span className="loginDesc">Rate, what you trust!</span>
                <span>Don't you have an account?</span>
                <button className="loginRegisterButton" type="submit">{isFetching ? <CircularProgress color="primary"/> : "Register"}</button>

            </div>

            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <h1>Login</h1>
                    <input className="loginInput" type="email" placeholder="Email" ref={email} required  />
                    <input className="loginInput" type="password" placeholder="Password" ref={password} required minLength="6"/>
                    <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress/> : "Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    
                </form>
            </div>

        </div>
    </div>
  ) */
}
