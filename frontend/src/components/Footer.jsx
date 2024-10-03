import React from 'react'
import classes from "../styles/Footer.module.css";
import { Link } from 'react-router-dom';

export default function Footer() {

  function scrollToAboutUs() {
  const element = document.getElementById('aboutus');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

  return (
    <div className={classes.section}>
      <div className={classes.container1}>
        <div className={classes.content1}>
          <div className={classes.about}>
          <a href="/about-us" onClick={scrollToAboutUs} className={classes.aboutUsLink}>
          <div>ABOUT US</div></a>
          </div>
          <div className={classes.copyRightMsg}>
            <div>CopyRight @2024, All rights reserved</div>
          </div>
          <div className={classes.socialLinks}>
            <div>INSTA</div>
            <div>FB</div>
            <div>LinkedIn</div>
          </div>
        </div>
      </div>
    </div>
  )
}
