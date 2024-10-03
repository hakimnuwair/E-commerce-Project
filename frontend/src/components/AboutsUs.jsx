import React from 'react'
import classes from "../styles/AboutUs.module.css"
import img from "../imgs/startae-team-7tXA8xwe4W4-unsplash.jpg"


export default function AboutsUs() {
  return (
    <>
    <div className={classes.section}>
        <div className={classes.container1}>
            <div className={classes.content1}>
                <div className={classes.imgContainer}>
                    <img src={img} className={classes.img}></img>
                </div>
                <div className={classes.descriptionContainer}>
                    <div className={classes.heading}>
                        ABOUT US
                    </div>
                    <div className={classes.description}>
                    At Latest custom, we are dedicated to offering top-quality products and a seamless shopping experience. Our goal is to provide exceptional service and make every purchase enjoyable. Thank you for choosing us!                   
                     </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
