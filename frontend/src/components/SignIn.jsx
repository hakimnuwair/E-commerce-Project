import React, { useState } from 'react'
import "../styles/SignIn.css"
import {Form, Link } from 'react-router-dom'


export default function SignIn({handleAuthStatus}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <>
      <div className="login-section-container">
    <div className="login-sub-section">
      <div className="login-side-style">
        <p style={{marginBottom: "10px"}}>LOGIN</p>
        <p>Get access to your Cart and Orders!</p>
      </div>
        <div className="login-container">
          <div className="login-cart-container">
            <div className="input-container">
              <Form method="post">
              <div className="login-input-row">
                <label>Full Name</label>
                <input type="text" name="fullName"></input>
              </div>
              <div className='signin-form-group'>
             <label>Email Id (Useranme)</label>
             <input type='text' name='email' placeholder='Email Id'></input>
         </div>
            <div className='signin-form-group'>
             <label>Password</label>
             <input type='password' name='password' placeholder='Password'></input>
        </div>
        <div className='signin-form-group'>
             <label>Confirm Password</label>
             <input type='text' placeholder='Confirm Password'></input>
         </div>
            
              {/* {data && data.errors && <ul>
                {Object.values(data.errors.map(err => <li key={err} style={{color: "red"}}>{err}</li>))}
                </ul>}
                { 
                  data && data.message && <p style={{color: "red"}}>{data.message}</p>
                } */}
              <button
                className="main-login-btn btn btn-primary"
                type="submit"
              >
                Login
              </button>
              </Form>
              {loading ?
              <p>Loading...</p> :
              err ? 
              <p>Invalid Credidentials</p>:
              null
              }
            </div>
          </div>
          <div className="create-account-container">
            <p>already have an account?{" "}</p>
            <div className="signin-form-group">
                       <label>
                         already have an account?{" "}
                         <Link onClick={() => handleAuthStatus("logIn")}>Login</Link>
                       </label>
                       <button
                         className="login-button"
                         style={{ backgroundColor: "orange" }}
                       >
                         Create Account
                       </button>
                     </div>
          </div>
          </div>
        </div>
      </div>
    </>
















    // <>
    // <div className='order-signin-container-grid3'>
    //     <div className='signin-form-group'>
    //         <label>Username</label>
    //         <input type='text' placeholder='First and Last name'></input>
    //     </div>
    //     <div className='signin-form-group'>
    //         <label>Email Id</label>
    //         <input type='text' placeholder='Email Id'></input>
    //     </div>
    //     <div className='signin-form-group'>
    //         <label>Mobile Number</label>
    //         <input type='text' placeholder='Mobile Number'></input>
    //     </div>
    //     <div className='signin-form-group'>
    //         <label>Password</label>
    //         <input type='password' placeholder='Password'></input>
    //     </div>
    //     <div className='signin-form-group'>
    //         <label>Confirm Password</label>
    //         <input type='text' placeholder='Confirm Password'></input>
    //     </div>
    //     <div className="signin-form-group">
    //                   <label>
    //                     already have an account?{" "}
    //                     <Link onClick={() => handleAuthStatus("logIn")}>Login</Link>
    //                   </label>
    //                   <button
    //                     className="login-button"
    //                     style={{ backgroundColor: "orange" }}
    //                   >
    //                     Create Account
    //                   </button>
    //                 </div>
    // </div>
    // </>
  )
}
