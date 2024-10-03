import React from 'react'
import classes from "../styles/LoginSummary.module.css"
import img from "../imgs/icons8-tick-box-52.png"



export default function ProductsConfirm({handleOrderSummary, product, handleProcessNo}) {
  let items = 0;
  product.map(prod => items = items + prod.quantity)

  const handleProductChange = () => {
    handleOrderSummary(false);
    handleProcessNo(3);
  }
    
  return (
    <>
     <div className={classes.loginSummarySection}>
        <div className={classes.loginSummaryContainer} >
            <div className={classes.successContent}>
            <div className='serial-no'>3
            </div>
             <div className=''>
                <div className={classes.successHeading}>
                    <p style={{marginBottom: "0px"}}>ORDER SUMMARY</p>
                    <img src={img} height="16px"></img>
                </div>
                <p style={{marginBottom: "0"}}>Total ({items} Items)</p>
            </div>
            </div>
            <button className={classes.changeBtn} onClick={handleProductChange}>CHANGE</button>
        </div>
    </div>
    </>
  )
}
