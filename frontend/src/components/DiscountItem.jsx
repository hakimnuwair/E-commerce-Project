import React from "react";
import classes from "../styles/DiscountItem.module.css"
import { Link } from "react-router-dom";

export default function DiscountItem({discount}){
  const redirectTo = discount.discountName.replace(/\s+/g, '').toLowerCase();
  const discountName = discount.discountName.toUpperCase();

  return (
        <>
        <div className={classes.section}>
            <div className={classes.container}>
                <div className={classes.contentContainer}>
                    <div className={classes.imgContainer}>
                    <Link to={`/${redirectTo}`} className="">
                    <img  className={classes.img} src={discount.imageUrl} height="201" width="250"></img>
                    </Link>
                    </div>
                    <div className={classes.redirect}>
                    <div className={classes.name}>{discountName}</div>
                    <div className={classes.explore}>
                <Link to={`/${redirectTo}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-arrow-right"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 8 16 12 12 16"></polyline>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </Link>
              </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}