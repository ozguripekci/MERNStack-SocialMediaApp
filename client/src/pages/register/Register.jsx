import axios from "axios";
import { useRef } from "react";
//import "./register.css";
import "./register.scss";

import { useHistory } from "react-router";
import {Link} from "react-router-dom"




export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h1>Ratify</h1>
          <span>Rate, what you trust!</span>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <div className="loginRight">
          <h1>Register</h1>
          <form onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              type="password"
            />
            <button type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );


/*   OLD CSS WITH classnames 
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Ratify</h3>
          <span className="loginDesc">
            Rate, what you trust!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>

            <button className="loginRegisterButton">
              <Link to="/login" style={{textDecoration:"none"}}>
                <span className="loginRegisterButton">Log into Account</span>
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} */
}