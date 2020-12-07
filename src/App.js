import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
// import UserContext from "./context"

import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import AddItems from './components/AddItems';
import ItemsList from './components/ItemsList';
import Login from './components/Login';
import Signup from './components/Signup';
import EditItems from './components/edit';

// import CategoryList from './components/CategoryList';

function App() {
  return (
    <Router className = "container">
      <div>
        
        <Navbar />

        
        <ProtectedRoute path="/ItemsList" component={ItemsList} isAuth={localStorage.length>0}/>
        {/* <ProtectedRoute path="/ItemsList" component={CategoryList} isAuth={localStorage.length>0}/> */}
        <ProtectedRoute path="/addItems" component={AddItems} isAuth={localStorage.length>0}/>
        <Route path = "/addUser"  component = { Signup } />
        <Route path = "/login" component = { Login } />
        <Route path = "/edit/:id" component = { EditItems }/>
        <Route path = "/logout" component = { Login } />
        <Route path = "/" component = { Homepage } />
    
      </div>
    </Router>
  );
}

export default App;
