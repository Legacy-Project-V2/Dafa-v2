import React, { useState, useContext } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { useHistory } from "react-router-dom";
import usercontext from "../context";




export default function Login(){
  const [username, setusername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(usercontext)
  const history = useHistory();

    const submit = async (e) => { 
      e.preventDefault();
      try {
        const loginUser = { username, password };
        const loginRes = await axios.post('http://localhost:8000/addUser/login', loginUser);
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        localStorage.setItem("aaddUser-token", loginRes.data.token);
        const trying = axios.post("http://localhost:8000/addUser/tokenIsValid" , setUserData.token)
        console.log(trying)
        history.push("/AddItems")
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
        console.log(err.response.data.msg)
      }
         
    };

        return (
               <div>





               <br />
               <div className = "container">
                <form className="text-center border border-light p-9" onSubmit={submit}>
   {error && <div message={error} clearError={()=> setError(undefined)} />}
                <h3 className = "mb-3">
                Login
                </h3>
                <br />
                <div className="col">
                <label > User Name </label>
                <br></br>
                <input required = {true} type='text' className="form-control" onChange={ e => setusername(e.target.value)} placeholder='Enter Your UserName'/>                   
                <br></br>
                </div>
                <br></br>
                <div className="col">
                <label > Password </label>
                <br></br>
                <input required = {true} type="password" name="password" className="form-control col" onChange={ e => setPassword(e.target.value)} placeholder='Enter Your Password' />
                </div>
                <br></br>
                <input type='submit' value='Log In' className="btn btn-deep-orange darken-4"/>
                <br></br>
                <br></br>
                <p>Don't have an account? <a href='/addUser'> Sign Up</a></p>
                </form>
             </div>
             <Footer />
             </div>
        )  
    
}



