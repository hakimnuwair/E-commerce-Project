import React, { useState } from 'react'
import classes from "../styles/AdminNav.module.css"
import logo from "../imgs/IMG_20240610_160027.jpg";
import { Form, Link } from 'react-router-dom';

export default function AdminNav({handleMenuClick}) {
  return (
    <>
      <div className={classes.section}>
          <nav className={classes.container}>
            <div className={classes.imgContainer}>
              <img className={classes.logo} src={logo} alt="logo" />
            </div>
            <ul className={classes.navLinks}>
              <li className={classes.home}><Link to={"/"}>HOME</Link></li>
              <li><Form action='/logout' method='POST'>
              <button className={classes.logoutBtn}>Logout</button>
              </Form></li>
              <li  onClick={handleMenuClick}><div className={`fa fa-bars hamburger ${classes.menu}} `}></div></li>
            </ul>
          </nav>
      </div>
      <div className={classes.marginHelper}></div>
    </>
  )
}
