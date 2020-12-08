import React, { useState, useContext } from 'react';
import axios from 'axios';
import Footer from './Footer';
import usercontext from "../context";
import { useHistory } from "react-router-dom";



export default function Signup() {
  const [username, setusername] = useState();
  const [password, setPassword] = useState();
  const [Phone, setPhone] = useState();
  const [address, setaddress] = useState();
  const [error, setError] = useState();
  const { setUserData } = useContext(usercontext)
  const history = useHistory();
  
  



    const submit = async (e) => {
      e.preventDefault();
      try {
        const newUser = { username, password, Phone, address };
        await axios.post('htp:t//localhost:8000/addUser/adduser', newUser);
        const loginRes = await axios.post('http://localhost:8000/addUser/login', {
          username,
          password,
        });
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        localStorage.setItem("aaddUser-token", loginRes.data.token);
        history.push("/login");
      }
      catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
        console.log(err)
      }
    };
    

//where the magic happence
    
        return (

          <div>
            <br />
            <div className = "container text-center">
            <form className="text-center border border-light p-9" onSubmit={submit}>
                <h3 className = "mb-3">
                Sign Up
                </h3>
                <br />
                {error && <div message={error} clearError={() => setError(undefined)} />}
                <div className = "col">
                <label > UserName </label>
                <br></br>
                <input required='{true}' type='text'className="form-control col"   onChange={e => setusername(e.target.value)} placeholder='User Name'/>                   
                <br></br>                
                </div>



                <div className = "col">
                <label > Creat Password </label>
                <br></br>
                <input required='{true}'  type="password" name="password" className="form-control col" onChange={e => setPassword(e.target.value)} placeholder='Creat Password' />
                <br></br>
                </div>

                <div className = "col">
                <label > Phone Number </label>

                <input required='{true}'  className="form-control col"  onChange={e => setPhone(e.target.value)}  placeholder='Phone Number' />
                <br></br>
                </div>

                <div className = "col"> 
                <label > Address </label>
                <br></br>
                <input required='{true}' type='text' className="form-control col"  onChange={e => setaddress(e.target.value)} placeholder='Address' />
                <br></br>
                </div>

                <input type='submit' value='Creat Account' className="btn btn-deep-orange darken-4"/>
                <br></br>
                <br></br>
                <b>If you already have an account<a href='/login'> Log In </a></b>
                <br></br>
            </form>
       
            </div>
            <Footer />
            </div>
          
         
        )
    };