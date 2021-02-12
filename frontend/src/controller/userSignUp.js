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
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [gender,setGender] = useState("");
  const [place,setPlace] = useState("");
  const [profession,setProfession] = useState("");

  const [passwordToggle,setPasswordToggle] = useState("password");
  const [icon,setIcon] = useState(faEye);

  const handleNameChanges = e => {
    setName(e.target.value);
  };

  const handleEmailChanges = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChanges = e => {
    setPassword(e.target.value);
  };

  const handlePhoneChanges = e => {
    setPhone(e.target.value);
  };

  const handleGenderChanges = e => {
    setGender(e.target.value);
  };

  const handlePlaceChanges = e => {
    setPlace(e.target.value);
  };

  const handleProfessionChanges = e => {
    setProfession(e.target.value);
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
                            id = "loginPassword"
                            value = {password}
                            onChange = {handlePasswordChanges}
                            type = {passwordToggle}
                            />
                            <FontAwesomeIcon id = "fonts" icon={icon} onClick = {togglePasswordDisplay} />
                            <br/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td><p><code>Re-enter Password:-  </code></p></td>
                        <td>
                        <input
                            id = "loginPassword"
                            value = {password}
                            onChange = {handlePasswordChanges}
                            type = {passwordToggle}
                            />
                            <FontAwesomeIcon id = "fonts" icon={icon} onClick = {togglePasswordDisplay} 
                        />
                        </td>
                        <br/><br/>
                    </tr>
                    <tr>
                        <td><p><code>Phone Number:-  </code></p></td>
                        <td>
                        <input
                            id = "loginPassword"
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
                            id = "loginPassword"
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
                            id = "loginPassword"
                            value = {profession}
                            onChange = {handleProfessionChanges}
                            type = "text"
                        />
                        </td>
                        <br/><br/>
                    </tr>

                    <tr>
                        <td><p><code>Languages Known :-  </code></p></td>
                        <br/>
                            <input
                                type="checkbox" id="english" name="english" value="English"
                            />
                            <label for="english"> English </label><br/>

                            <input
                                type="checkbox" id="malayalam" name="malayalam" value="Malayalam"
                            />
                            <label for="malayalam"> Malayalam </label><br/>

                            <input
                                type="checkbox" id="kannada" name="kannada" value="Kannada"
                            />
                            <label for="kannada"> Kannada</label><br/>

                            <input
                                type="checkbox" id="hindi" name="hindi" value="Hindi"
                            />
                            <label for="hindi"> Hindi</label><br/>
                        <br/><br/>
                    </tr>
                </tbody>
            </table>
            <br/><br/>
            <Button variant="success" size="lg" onClick = {login} >
              Sign Up
            </Button>{' '}
            <br/><br/>
            <span id = "userSignUp"><b>Back to </b> <a onClick = {login} ><u>Login</u></a></span>

            <br/><br/>
        </span>
      </header>
    </div>
  );
}

export default UserSignUp;
