import React, { useState,useReducer,useEffect } from "react";
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import UserSignUp from './controller/userSignUp';
import { backendUrls } from './backendUrls';

function App() {
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [passwordToggle,setPasswordToggle] = useState("password");
  const [icon,setIcon] = useState(faEye);

  const handleNameChanges = e => {
    setName(e.target.value);
  };

  const handlePasswordChanges = e => {
    setPassword(e.target.value);
  };

  // Toggles between showing the "Show-password" icon or not
  function togglePasswordDisplay(){

    // If the password type was hidden, the password will be visible on button click
    if(passwordToggle === "password"){
      setPasswordToggle("text");

      // fetching the "eye-slash" icon to hide the password again on click
      setIcon(faEyeSlash);
    }
    else{
      setPasswordToggle("password");
      // fetching the "eye" icon to display the password again on click
      setIcon(faEye);
    }
  }

  function login(){

    // If a valid name and password was given
    if(name && password){
      axios.post(backendUrls.loginUrl,{
        name: name,
        password: password
      }).then(jsonResponse => {
        if(jsonResponse.data.status === 200){
          alert("Login Successful")
        }
        else{
          // Shows the error message received from the API
          alert(jsonResponse.data.message);
        }  
      });
    }
    else{
      alert("Please enter the email and password")
    }

  }

  // Navigates to employee sign up page
    function signUp(){
      ReactDOM.render(
        <UserSignUp />,
      document.getElementById('root')
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <span id = "loginTitle">
          <code><u>Login Page</u></code>
          <br/><br/>
        </span>
        <span id = "loginEntry">
          <p><code>User Name:- </code></p>
            <input
            value = {name}
            onChange = {handleNameChanges}
            type = "text"
            />
          <br/><br/>
          <p><code>Password:-  </code></p>
          <input
            className = "loginPassword"
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
            <span id = "userSignUp"><b>Are you new here? Please </b> <a onClick = {signUp} ><u>Sign Up</u></a></span>
        </span>
      </header>
    </div>
  );
}

export default App;
