// src/components/Auth.js
import { Form, Link, useActionData } from 'react-router-dom';
import React, { useState } from 'react';
import "../styles/Auth.css";

function Auth() {
  const data = useActionData();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setemail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className='auth-section'>
      <div className="login-section-container">
        <div className="login-sub-section">
          <div className="login-side-style">
            <p style={{ marginBottom: "10px" }}>LOGIN</p>
            <p>Get access to your Cart and Orders!</p>
          </div>
          <div className="login-container">
            <div className="login-cart-container">
              <div className="input-container">
                <Form method="post">
                  <div className="login-input-row">
                    <label>Enter Username (Email)</label>
                    <input name="email" value={email} type="text" onChange={handleChange}></input>
                  </div>
                  <div className="login-input-row last-row">
                    <label>Enter password</label>
                    <input name="password" value={password} type="password" onChange={handleChange}></input>
                  </div>
                  {data && data.errors && <ul>
                    {Object.values(data.errors).map(err => <li key={err} style={{ color: "red" }}>{err}</li>)}
                  </ul>}
                  {data && data.message && <p style={{ color: "red" }}>{data.message}</p>}
                  <button className="main-login-btn btn btn-primary" type="submit">
                    Login
                  </button>
                </Form>
                {loading ? (
                  <p>Loading...</p>
                ) : err ? (
                  <p>Invalid Credentials</p>
                ) : null}
              </div>
            </div>
            <div className="create-account-container">
              <p>New to Quality?</p>
              <Link to="/account?login=false" style={{ textDecoration: "none", color: "#fff" }}>
                <button className="create-account-btn btn btn-primary">
                  Create an account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Auth;


