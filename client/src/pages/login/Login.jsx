import { useContext, useRef } from "react";
import "./login.css"
import {loginCall} from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext"
import {CircularProgress} from "@material-ui/core"



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
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Ratify</h3>
                <span className="loginDesc">Rate, what you trust!</span>
                <br /><br /><br /><br /><br /><br />
                <p className="rights">All rights reserved.</p>
                <p className="rights">Özgür Ipekci - 2022</p>


            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input className="loginInput" type="email" placeholder="Email" ref={email} required  />
                    <input className="loginInput" type="password" placeholder="Password" ref={password} required minLength="6"/>
                    <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress/> : "Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton" type="submit">{isFetching ? <CircularProgress color="primary"/> : "Create New Account"}</button>

                </form>
            </div>

        </div>
    </div>
  )
}
