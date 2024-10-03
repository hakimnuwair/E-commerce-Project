import React, { useEffect, useState } from 'react'
import classes from "../styles/LoginSummary.module.css"
import axios from 'axios';
import img from "../imgs/icons8-tick-box-52.png"

export default function LoginSummary({authData , handleUserChange, handleProcessNo}) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userDetailsError, setUserDetailsError] = useState(null);

    useEffect(()=>{
        const fetchUserDetails = async () => {
            const { token } = authData;
            if (!token) {
                return 
            }else{
                try {
                    setLoading(true);
                    const response = await axios.get('http://localhost:8080/user', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if(response && response.status=== 200){
                        console.log("fetched userDetails: ",response.data);
                        setUserDetails(response.data);
                        setLoading(false);
                        setUserDetailsError(null);
                    }else{
                        setLoading(false);
                        console.error(response);
                        setUserDetailsError("Something went wrong, try again later");
                    }
                } catch (error) {
                    setLoading(false);
                    console.error('Error fetching user details:', error);
                    setUserDetailsError("Error Loading data, try again later");
                }
            }
        
           
        };
        fetchUserDetails();
    },[])


    

    const handleChange = () => {
        handleUserChange(userDetails.email);
        handleProcessNo(1);
    }
    
  return (
    <>
    <div className={classes.loginSummarySection}>
        <div className={classes.loginSummaryContainer} >
            {loading ? <label >Loading...</label> : userDetailsError ? <label style={{color: "red"}}>{userDetailsError}</label> : (
                <>
                <div className={classes.successContent}>
                <div className='serial-no'>1</div>
                 <div className={classes.detailsContainer}>
                    <div className={classes.successHeading}>
                        <p style={{marginBottom: "0px"}}>LOGIN</p>
                        <img src={img} height="16px"></img>
                    </div>
                    <div className={classes.loginDetails}>
                        <p className={classes.details}>{userDetails.fullName}</p>
                        <p className={classes.details}>{userDetails.email}</p>
                    </div>
                </div>
                </div>
                <button className={classes.changeBtn} onClick={handleChange}>CHANGE</button>
                </>
            )}
        </div>
    </div>
    </>
  )
}
