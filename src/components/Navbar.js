import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Authbuttons from "./AuthButtons"


export default class Navbar extends Component {

  render() {
    return (
      <div>
      <nav style = {{ color: "red" }} className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/Homepage" className="navbar-brand">DAFAH</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto" >
          <li className="navbar-item" >
          <Link to="/AddItems" className="nav-link">Add Items</Link>
          </li>
          <li className="navbar-item">
          <Link to="/ItemsList" className="nav-link">View Items</Link>
          </li>
          <Authbuttons/>
          {/* <li className="navbar-item">
          <Link to="/login" className="nav-link">Login</Link>
          </li> */}
          {/* <li className="navbar-item"onClick={logout}>
          <Link to="/logout" className="nav-link">Log out</Link>
          </li> */}
        </ul>
        </div>
      </nav>
      </div>
    );
  }
}


//  function logout(){

//   window.localStorage.clear();
//   window.location = '/Homepage'

//  }