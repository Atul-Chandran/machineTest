import React, { useState,useReducer,useEffect } from "react";
import ReactDOM from 'react-dom';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import App from "../App";
import '../styles/userSignUp.styles.css';
import { backendUrls } from '../backendUrls';

function UserSignUp() {

  // ********** Details sent to register the user ************
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [reenterPassword,setReenterPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [place,setPlace] = useState("");
  const [profession,setProfession] = useState("");
  // ********** Detail list ends here *************

  // ********** Password verificatiion *********
  const [isUpperCase,setUpperCase] = useState(false);
  const [isLowerCase,setLowerCase] = useState(false);
  const [isNumber,setNumber] = useState(false);
  // ********** Password verification ends

  // Verification if the password and re-entered password matches
  const [passwordsMatch,setPasswordsMatch] = useState(false);

  // Hides or displays the password
  const [passwordToggle,setPasswordToggle] = useState("password");

  // Hides or displays the re-entered password
  const [reenterPasswordToggle,setReenterPasswordToggle] = useState("password");

  // Manages the password icon
  const [icon,setIcon] = useState(faEye);

  // Manages the re-entered password icon
  const [reenterIcon,setReenterIcon] = useState(faEye);

  const handleNameChanges = e => {
    setName(e.target.value);
  };

  const handleEmailChanges = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChanges = e => {
    const enteredPassword = e.target.value;
    var arePasswordsSame = false;

    // Checking if the password entered has an uppercase character
    /[A-Z]/.test(enteredPassword) === true ? 
      changeColour("upper") : 
      document.getElementById("uppercaseCheck").style.color = "red";

    // Checking if the password entered has a lowercase character
    /[a-z]/.test(enteredPassword) === true ? 
      changeColour("lower") : 
      document.getElementById("lowercaseCheck").style.color = "red";    

    // Checking if the password entered has a number
    /[0-9]/.test(enteredPassword) === true ? 
      changeColour("number") : 
      document.getElementById("numberCheck").style.color = "red";

    // Check if password and re-entered password is same only if both values are not blank
    if(enteredPassword && reenterPassword){
        arePasswordsSame = checkPasswordsMatch(enteredPassword,reenterPassword);
    }

    const isPasswordMatchText = document.getElementById("passwordMatch");
    
    // If passwords do not match
    if(!arePasswordsSame){
      isPasswordMatchText.innerText = "Passwords do not match";
      isPasswordMatchText.style.color = "red";
    }

    else{
      isPasswordMatchText.innerText = "Passwords match";
      isPasswordMatchText.style.color = "green";
      setPasswordsMatch(true);
    }
    
    setPassword(enteredPassword);
  };

  const handleReEnterPasswordChanges = e => {
    const passwordReentered = e.target.value;
    let arePasswordsSame = false;

    // Check if password and re-entered password is same only if both values are not blank    
    if(password && passwordReentered){
       arePasswordsSame = checkPasswordsMatch(password,passwordReentered);
    }

    const isPasswordMatchText = document.getElementById("passwordMatch");
    
    // If passwords do not match
    if(!arePasswordsSame){
      isPasswordMatchText.innerText = "Passwords do not match";
      isPasswordMatchText.style.color = "red";
    }

    else{
      isPasswordMatchText.innerText = "Passwords match";
      isPasswordMatchText.style.color = "green";
      setPasswordsMatch(true);
    }

    setReenterPassword(passwordReentered);
  }

  const handlePhoneChanges = e => {
    setPhone(e.target.value);
  };

  const handlePlaceChanges = e => {
    setPlace(e.target.value);
  };

  const handleProfessionChanges = e => {
    setProfession(e.target.value);
  };

  // Changes the colour of the given password type and sets it accordingly
  function changeColour(passwordType){
    switch(passwordType){
      case "upper": document.getElementById("uppercaseCheck").style.color = "green";
                    setUpperCase(true);
                    break;
      
      case "lower": document.getElementById("lowercaseCheck").style.color = "green";
                    setLowerCase(true);
                    break;
      
      case "number": document.getElementById("numberCheck").style.color = "green";
                     setNumber(true);
                     break;
    }
  }

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

  function checkPasswordsMatch(initialPassword,reEnteredPassword){
    if(initialPassword === reEnteredPassword)
      return true;
    return false;
  }

  function toggleReenterPasswordDisplay(){
    if(reenterPasswordToggle === "password"){
      setReenterPasswordToggle("text");
      setReenterIcon(faEyeSlash);
    }
    else{
      setReenterPasswordToggle("password");
      setReenterIcon(faEye);
    }
  }

  function signup(){
    if(isUpperCase && isLowerCase && isNumber && passwordsMatch){
      const genderValue = document.getElementById("gender").value;
      axios.post(backendUrls.signupUrl,{
        name: name,
        password: password,
        email: email,
        phoneNumber: phone,
        gender: genderValue,
        place: place,
        profession: profession
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
    <div className="signupForm">
      <header className="App-header">
        <span id = "signUpTitle">
          <code><u>Sign Up Page</u></code>
          <br/><br/>
        </span>
        <span id = "signUpEntry">
            <table>
                <tbody>
                    <tr>
                        <td><p><code>User Name:- </code></p></td>
                        <td>
                            <input
                                value = {name}
                                onChange = {handleNameChanges}
                                type = "text"
                                />
                            <br/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td><p><code>User Email:- </code></p></td>
                        <td>
                            <input
                            value = {email}
                            onChange = {handleEmailChanges}
                            type = "email"
                            />
                            <br/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td><p><code>Password:-  </code></p></td>
                        <td>
                        <input
                            className = "loginPassword"
                            value = {password}
                            onChange = {handlePasswordChanges}
                            type = {passwordToggle}
                            />
                            <FontAwesomeIcon id = "fonts" icon={icon} onClick = {togglePasswordDisplay} />
                            <br/><br/>
                        </td>
                    </tr>
                    <tr>
                      <td>
                        <br/>
                        <code>Following conditions must be met :-</code>
                        <br/><br/>
                        <code id = "uppercaseCheck">At least one upper case letter</code>
                        <br/>
                        <code id = "lowercaseCheck">At least one lower case letter</code>
                        <br/>
                        <code id = "numberCheck">At least one number</code>
                        <br/><br/>
                      </td>
                    </tr>
                    <tr>
                        <td><p><code>Re-enter Password:-  </code></p></td>
                        <td>
                        <input
                            className = "loginPassword"
                            value = {reenterPassword}
                            onChange = {handleReEnterPasswordChanges}
                            type = {reenterPasswordToggle}
                            />
                            <FontAwesomeIcon id = "fonts" icon={reenterIcon} onClick = {toggleReenterPasswordDisplay} 
                        />
                        </td>
                        <br/><br/>
                    </tr>
                    <tr>
                      <td>
                        <br/>
                        <code id = "passwordMatch"></code>
                        <br/><br/>
                      </td>
                    </tr>
                    <tr>
                        <td><p><code>Phone Number:-  </code></p></td>
                        <td>
                        <input
                            className = "loginPassword"
                            value = {phone}
                            onChange = {handlePhoneChanges}
                            type = "number"
                            />
                        </td>
                        <br/><br/>
                    </tr>
                    <tr>
                        <td><p><code>Gender:-  </code></p></td>
                        <td>
                            <select name="gender" id="gender">
                                <option value="default" disabled>Select an option</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="N/A">Prefer not to say</option>
                            </select>
                        </td>
                        <br/><br/>
                    </tr>
                    <tr>
                        <td><p><code>Place:-  </code></p></td>
                        <td>
                        <input
                            className = "loginPassword"
                            value = {place}
                            onChange = {handlePlaceChanges}
                            type = "text"
                            />
                        </td>
                        <br/><br/>
                    </tr>

                    <tr>
                        <td><p><code>Profession:-  </code></p></td>
                        <td>
                        <input
                            className = "loginPassword"
                            value = {profession}
                            onChange = {handleProfessionChanges}
                            type = "text"
                        />
                        </td>
                        <br/><br/>
                    </tr>
                </tbody>
            </table>
            <br/><br/>
            <Button variant="success" id = "signup" size="lg" onClick = {signup} >
              Sign Up
            </Button>{' '}
            <br/><br/>
            <span id = "userLogin"><b>Back to </b> <a onClick = {login} ><u>Login</u></a></span>

            <br/><br/>
        </span>
      </header>
    </div>
  );
}

export default UserSignUp;
