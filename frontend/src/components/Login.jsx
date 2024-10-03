import React, { useState } from 'react'
import "../styles/OrderProduct.css"
import { Form, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Login({handleAuthStatus , handleChangeLogin, handleUserChange}) {
  const [email, setEmail] = useState('');
  const [password , setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name , value} = e.target;
    if(name === "email"){
      setEmail(value);
    }else if(name === "password"){
      setPassword(value);
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("req data: "  + email + password);
      if(!email || !password){
          return
      }
      try{
        const response = await axios.post(`${BASE_URL}/authenticate`,{
          email : email,
          password : password,
        });
        if(response.status === 200){
          localStorage.setItem("token",response.data.jwtToken);
          localStorage.setItem("roles",response.data.userRoles);
          handleUserChange(null);
          navigate("/order");
        }
      }catch(error){
        toast.error("Invalid Credentials",{
          position: 'top-center'
        });
        console.error(error);
      }
  }
  return (
    <>
    <div className='login-order-section'>
    <Form className="login-form" onSubmit={handleSubmit} style={{ marginBottom: "10px"}}>
      <div className="login-form-group">
        <label htmlFor='username'>Username (Email Id)</label>
        <input name='email' value={email} type="text" placeholder='Enter Email' onChange={handleChange} required></input>
      </div>
      <div className="login-form-group">
        <label htmlFor='password'>Password</label>
        <input name='password' value={password} type="password" placeholder='Enter Password' onChange={handleChange} required></input>
      </div>
      <div className="login-form-group" style={{alignSelf: "end"}}>
        <button
          type='submit'
          className="login-button"
          style={{ backgroundColor: "orange"}}
        >
          LOGIN
        </button>
      </div>
      </Form>
      <p style={{ marginBottom: "0"}}>Want to create new account? <Link onClick={()=>handleAuthStatus("signIn")}>SignUp</Link></p>
      </div>
  </>
  )
}
