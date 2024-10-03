import React, { useState } from 'react'
import classes from "../styles/SignUp.module.css"
import { Form, Link } from 'react-router-dom'
import axios from 'axios';

export default function SignUp({handleAuthStatus}) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfrmPassword, setCnfrmPassword] = useState(""); 
    const [passwordErr, setPasswordErr] = useState(null);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setErr(false);
        setSuccess(null);
        setPasswordErr(null);
        const {name , value} = e.target;
        if(name === "fullName"){
            setFullName(value);
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
        if(password !== cnfrmPassword){
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
                    setFullName("");
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
    <>
    <Form onSubmit={handleSubmit} className={classes.section}>
        <div className={classes.container}>
            <div className={classes.formGroup}>
                <label htmlFor='fullName'>Full Name</label>
                <input name='fullName' value={fullName} placeholder='Enter Full Name' onChange={handleChange} required></input>
            </div>
            <div className={classes.formGroup}> 
                <label htmlFor='email'>Email (Useranme)</label>
                <input name='email' value={email} type='email' placeholder='Enter Email Id' onChange={handleChange} required></input>
            </div>
            <div className={classes.formGroup}>
                <label htmlFor='password'>Password</label>
                <input name='password' value={password} type='password' placeholder='Enter Password' onChange={handleChange} required></input>
            </div>
            <div className={classes.formGroup}>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input name='cnfrmPassword' value={cnfrmPassword} type='password' placeholder='Confirm Password' onChange={handleChange} required></input>
            </div>
            <div style={{alignSelf: "end"}}>
                {loading ?<button className='btn btn-primary'>Creating..</button> :
            <button type='submit' className='btn btn-primary'>Create Account</button>
                }
            </div>
            {err ? <label style={{color: "red"}}>There was an error creating the account!</label> : null}
            {success ? <label style={{color: "green"}}>User Created Successfully</label> : null}
            {passwordErr != null ? (<label style={{color: "red"}}>{passwordErr}</label>) : null}
        </div>
        <div className={classes.logInOption}>Already Have An Account? <Link onClick={()=>handleAuthStatus("logIn")}>Login</Link></div>
    </Form>
    </>
  )
}
