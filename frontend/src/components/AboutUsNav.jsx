import React, { useEffect } from 'react'
import classes from "../styles/AboutUsNav.module.css";
import img from "../imgs/viktor-forgacs-MGVLBuXS6Ic-unsplash.jpg"
import { Link } from 'react-router-dom';

export default function AboutUsNav() {
 

  return (
    <>
    <div className={classes.section}>
        <div className={classes.container}>
            <div className={classes.logoContaienr}>
              <Link to="/">
                <img src={img} className={classes.logo}></img>
                </Link>
            </div>
            <ul className={classes.navItemsContainer}>
                <Link to="/" className={classes.link}><li className={classes.navItem}>Home</li></Link>
            </ul>
        </div>
    </div>
    <div className={classes.stickyHelper}></div>
    </>
  )
}
