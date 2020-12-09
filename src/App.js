import React, { useState, useEffect } from 'react'; 
import { BrowserRouter , Switch, Route } from  "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
// import UserContext from "./context"
import UserContext from "./context"; // stores the token 
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import AddItems from './components/AddItems';
import ItemsList from './components/ItemsList';
import Login from './components/Login';
import Signup from './components/Signup';
import EditItems from './components/edit';
import axios from "axios"

// import CategoryList from './components/CategoryList';

function App() {
  const [userData, setUserData] = useState({ //why inside an array?
    token: undefined,// becouse we need to know if there is token if there is not the token must be undefined
    user: undefined,
  });

// CHECK IF THERE IS TOKEN IN LOCAL STOREGE OR NOT 
useEffect(() => {
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("aaddUser-token");
    if(token === null){ // add it to the localS automaticlly
      localStorage.setItem("aaddUser-token", "");
      token = "";
    }
    const tokenRes = await axios.post(
      "http://localhost:/addUser/tokenIsValid", 
      null, //the body is null, dont send anything to the body
      { headers: {"aaddUser-token": token}}
    );
    // console.log(tokenRes.data)// true or false 
    // to get the user 
    if(tokenRes.data){
      const userRes = await axios.get("http//localhost:/addUser/Homepage",{ 
        headers: {"aaddUser-token": token}, 
      });
      setUserData({
        token,
        user: userRes.data,
      })
    }
  };
  checkLoggedIn();

}, []); // the array is a dependensie list 



return (
  <>
    <BrowserRouter className = "container">
   

     <UserContext.Provider value={{ userData, setUserData}}>
      
          <Navbar/>
      <Switch>
      <Route exact path = "/Homepage" component = { Homepage } />
        <ProtectedRoute path="/ItemsList" component={ItemsList} isAuth={localStorage.length>0}/>
        <ProtectedRoute path="/addItems" component={AddItems} isAuth={localStorage.length>0}/>
        <Route path = "/addUser"  component = { Signup } />
        <Route path = "/login" component = { Login } />
        <Route path = "/edit/:id" component = { EditItems }/>
        <Route path = "/logout" component = { Login } />
      </Switch>
      
      </UserContext.Provider>
      
    </BrowserRouter>
  </>
);
}

export default App;
