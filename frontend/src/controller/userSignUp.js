import React, { useState,useReducer,useEffect } from "react";
import ReactDOM from 'react-dom';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import App from "../App";
import { backendUrls } from '../backendUrls';

function UserSignUp() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordToggle,setPasswordToggle] = useState("password");
  const [icon,setIcon] = useState(faEye);

  const handleEmailChanges = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChanges = e => {
    setPassword(e.target.value);
  };

  function togglePasswordDisplay(){
    if(passwordToggle === "password"){
      setPasswordToggle("text");
      setIcon(faEyeSlash);
    }
    else{
      setPasswordToggle("password");
      setIcon(faEye);
    }
  }

  function login(){
    if(email && password){
      axios.post(backendUrls.loginUrl,{
        email: email,
        password: password
      }).then(jsonResponse => {
        console.log("Response ",jsonResponse)
  
      });
    }
    else{
      alert("Please enter the email and password")
    }

  }
    // Navigates to employee sign up page
    function login(){
        ReactDOM.render(
          <App />,
        document.getElementById('root')
      );
    }

  return (
    <div className="App">
      <header className="App-header">
        <span id = "loginTitle">
          <code><u>Sign Up Page</u></code>
          <br/><br/>
        </span>
        <span id = "loginEntry">
          <p><code>User Name:- </code></p>
            <input
            value = {email}
            onChange = {handleEmailChanges}
            type = "text"
            />
          <br/><br/>
          <p><code>Password:-  </code></p>
          <input
            id = "loginPassword"
            value = {password}
            onChange = {handlePasswordChanges}
            type = {passwordToggle}
            />
            <FontAwesomeIcon id = "fonts" icon={icon} onClick = {togglePasswordDisplay} />
            <br/><br/>
            <Button variant="success" size="lg" onClick = {login} >
              Login
            </Button>{' '}
            <br/><br/>
            <span id = "userSignUp"><b>Are you new here? Please </b> <a onClick = {login} ><u>Sign Up</u></a></span>

            <br/><br/>
        </span>
      </header>
    </div>
  );
}

export default UserSignUp;
