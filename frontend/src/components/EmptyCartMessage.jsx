import React from "react";
import img from "../imgs/IMG_20240610_160027.jpg";
import { Form, Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import classes from "../styles/EmptyCart.module.css"

export default function EmptyCartMessage() {
  let isLogin;
  const authData = useRouteLoaderData('root');
  console.log("isLogin helper ",authData);
  if(authData.token == null){
    isLogin = false;
  }else{
    isLogin = true;
  }
  return (
    <div className={classes.emptyCartSection}>
      <div className={classes.emptyCartContainer}>
        <img src={img} alt="Empty Cart" className={classes.emptyCartImage} />
        <h4 className={classes.emptyCartTitle}>Your Cart is empty!</h4>
        {isLogin === true ? (
          <Form action="/">
            <button className={classes.shopButton}>SHOP NOW</button>
          </Form>
        ) : (
          <Link to="/account?login=true">
            <button className={classes.loginButton}>LOGIN NOW</button>
          </Link>
        )}
      </div>
    </div>
  );
  
}
