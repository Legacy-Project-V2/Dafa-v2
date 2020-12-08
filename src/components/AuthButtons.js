// authentication Buttonss Login & Logout 
// we can  use Link But insatde of that "UseHistory" function can do this work Better
// what is useHistory ? The useHistory hook gives you access to the history instance that you may use to navigate.
import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import usercontext from "../context";
import { Link } from 'react-router-dom';



export default function Authbuttonss() {
    const { userData, setUserData } = useContext(usercontext);
    // the history to change the url 
    const history = useHistory();

    const signup = () => history.push("/adduser");
    // const login = () => history.push("/login");
    const logout = () => { // in log out we will set the token & user to undefined .
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("aaddUser-token", "");
        history.push("/Homepage");
    };

    return (
        <nav className="auth-buttonss">
            {userData.user ? (
               <li className="navbar-item ml-auto" onClick={logout}>
               <Link to="/logout" className="nav-link ">Log out</Link>
               </li> 
            ) : (
                    <>
                        <li className="navbar-item  ml-auto">
          <Link to="/adduser" className="nav-link" onClick={signup}>signup</Link>
          </li>
                        {/* <li className="navbar-item">
          <Link to="/login" className="nav-link"  onClick={login}>Login</Link>
          </li> */}
                    </>
                )}
        </nav>
    )
}
