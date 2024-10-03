import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/CreateAccount.css"
import axios from 'axios';

export default function CreateAccount() {
    const [fullName, setfullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfrmPassword, setCnfrmPassword] = useState(""); 
    const [passwordErr, setPasswordErr] = useState("");
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setSuccess(null);
        setCnfrmPassword("");
        const {name , value} = e.target;
        if(name === "fullName"){
            setfullName(value);
        }else if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }else if(name === "cnfrmPassword"){
            setCnfrmPassword(value);
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(password != cnfrmPassword){
            setPasswordErr("Password do not match");
        }else{
            setLoading(true);
            setPasswordErr(null);
            setSuccess(null);
            try {
                const user = {
                    fullName: fullName,
                    email: email,
                    password: password
                };
                // Make the Axios POST request
                const response = await axios.post('http://localhost:8080/signup', user);
                console.log(response.data);  // Handle the response as needed
                if(response.status === 200){
                    setLoading(false);
                    setSuccess("Created account successfuly");
                    setfullName("");
                    setEmail("");
                    setPassword("");
                    setCnfrmPassword("");
                }else{
                    setLoading(false);
                    setErr(true);
                }
            } catch (error) {
                setLoading(false);
                setErr(true);
                console.error("There was an error creating the account!", error);
            }

            // Reset form fields after submission
        }
        
    }

  return (
         <div className='auth-section2'>
      <div className="login-section-container">
    <div className="login-sub-section">
      <div className="login-side-style">
        <p className='side-msg' style={{fontWeight : "500", marginBottom: "5px"}}>Looks like you're new here!</p>
        <p className='side-msg'>Fill the details to get started</p>
      </div>
        <div className="create-acc-container">
          <div className="create-cart-container">
            <div className="create-input-container">
              <form className='create-acc-form' method="post" onSubmit={handleSubmit}>
              <div className='create-input-group'>
                    <label>Full Name</label>
                    <input type='text' name='fullName' value={fullName} placeholder='First and last name' onChange={handleChange} required></input>
                </div>
                <div className='create-input-group'>
                    <label>Email ID (Username)</label>
                    <input type='email' name='email' value={email} placeholder='Email ID' onChange={handleChange} required></input>
                </div>
                <div className='create-input-group'>
                    <label>Password</label>
                    <input type='password' name='password' value={password} placeholder='Password' onChange={handleChange} required></input>
                </div>
                <div className='create-input-group'>
                    <label>Confirm Password</label>
                    <input type='password' name='cnfrmPassword' value={cnfrmPassword} placeholder='Confirm Password' onChange={handleChange} required></input>
                    {passwordErr && <p className='error'>{passwordErr}</p>}
                </div>
                <div className='registration'>
                <button className='register-btn btn btn-primary' type='submit' style={{fontSize: "16px", width: "100%"}}>{loading ? 'Creating account..' : 'Create account'}</button>
                {err && <p className='error'>error creating account,try again later</p>}
                {success && <p className='success'>{success}</p>}
                </div>
              </form>
              {loading ?
              <p>Loading...</p> :
              err ? 
              <p>Invalid Credidentials</p>:
              null
              }
            </div>
          </div>
          <div className='sign-in-option'>
                    <div>Already have an account?</div>
                    <span><Link to="/account?login=true">Sign in</Link></span>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}
