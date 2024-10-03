import React from "react";
import classes from "../styles/ContactUs.module.css";
import img from "../imgs/annie-spratt-hCb3lIB8L8E-unsplash.jpg"

export default function ContactUs() {
  return (
    <>
      <div className={classes.section}>
        <div className={classes.container1}>
          <div className={classes.container1A}>
          <div className={classes.content1A}>
            <div className={classes.heading}>Contact Us</div>
            <div className={classes.contactDescription}>
              <span>We’re Here to Help</span>
              <div className="">
                Whether you have questions about our products, need assistance
                with an order, or just want to provide feedback, our team is
                ready to assist you. Please fill out the form below with your
                message and contact details, and we’ll get back to you as soon
                as possible.{" "}
              </div>
            </div>
          </div>
          <form className={classes.content1B}>
            <div className={classes.inputGroup}>
              <label>Write message to us</label>
              <input type="text" placeholder="write"></input>
            </div>
            <div className={classes.inputGroup}>
              <label>Your email</label>
              <input type="email" placeholder="write"></input>
            </div>
            <div className={classes.btn}>
              <button className="btn btn-primary">SEND</button>
            </div>
          </form>
          </div>
          <div className={classes.container1B}>
          <img className={classes.img2} src={img} alt="contact image" />
        </div>
        </div>
      </div>
    </>
  );
}
