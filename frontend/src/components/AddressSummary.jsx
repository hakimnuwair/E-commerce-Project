import React from 'react'
import classes from "../styles/LoginSummary.module.css";
import img from "../imgs/icons8-tick-box-52.png"


  // address summary component
export default function AddressSummary({addressData, handleEditAddress, handleProcessNo}) {
  // handle edit address
  const handleEdit = () =>{
    handleEditAddress(addressData);
    handleProcessNo(2);
  }
  return (
    <>
    <div className={classes.loginSummarySection}>
        <div className={classes.loginSummaryContainer} >
            <div className={classes.successContent}>
            <div className='serial-no'>2</div>
             <div className=''>
                <div className={classes.successHeading}>
                    <p style={{marginBottom: "0px"}}>SHIPPING ADDRESS</p>
                    <img src={img} height="16px"></img>
                </div>
                <div className={classes.loginDetails}>
                <p>{addressData.fullAddress}, <span>{addressData.pincode}</span></p>
                </div>
            </div>
            </div>
            <button className={classes.changeBtn} onClick={handleEdit}>EDIT</button>
        </div>
    </div>
    </>
  )
}
