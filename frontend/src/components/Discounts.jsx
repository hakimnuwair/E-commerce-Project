import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import classes from "../styles/Discounts.module.css";
import "../styles/ScrollButtons.css";
import DiscountItem from "./DiscountItem";
import { Link } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Discounts() {
  const [discounts, setDiscounts] = useState(null);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);
  const [errDiscounts, setErrDiscounts] = useState(null);
  const [allDiscounts, setAllDiscounts] = useState(false);

  useEffect(() => {
    const fetchDiscounts = async () => {
      setLoadingDiscounts(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/discount/`);
        if (response.status === 200) {
          console.log("discount main: ", response.data);
          setDiscounts(response.data);
          setLoadingDiscounts(false);
        } else {
          setErrDiscounts("Internal Server Error");
          setLoadingDiscounts(false);
        }
      } catch (error) {
        setErrDiscounts("Error loading data, try again later");
        setLoadingDiscounts(false);
      }
    };
    fetchDiscounts();
  }, []);


  if(discounts && discounts.length === 0){
    return null;
  }

  return (
    <>
      <div className={classes.section}>
        <div className={classes.container}>
          <div className={classes.headline}>
          <div className={classes.headerTitle}>Featured Discounts</div>
          {discounts && discounts.length > 4 && (
              (
                <Link onClick={()=>{setAllDiscounts((prevState) => (!prevState))}}>
                {allDiscounts ?
                (<div className={classes.exploreSide}>
                <span style={{ marginRight: "8px" }}>Less</span>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="#007bff"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M28 16l-8 8 8 8"
                  stroke="#007bff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
                </div>)
                :
                (
                  <div className={classes.exploreSide}>
                <span  className={classes.desc}>More Discounts</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="#007bff"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    d="M20 16l8 8-8 8"
                    stroke="#007bff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </div>)
                }
                </Link>      
               )
            )}{" "}
          </div>
            <div className={`${classes.categoryGrid} "" ${discounts && discounts.length < 4 ? (classes.gridLess4) : null} `}>
              {loadingDiscounts ? (
                <p>Loading...</p>
              ) : errDiscounts ? (
                <p>{errDiscounts}</p>
              ) : (
                <>
                  {allDiscounts ?
                  discounts.map((discount) => (
                    <DiscountItem
                    key={discount.discountId}
                    discount={discount} 
                    />
                  ))
                  :    
                  (discounts.slice(0, 4).map((discount) => (
                    <DiscountItem
                      key={discount.discountId}
                      discount={discount}
                    />
                  )))}
                </>
              )}
            </div>
          </div>
        </div>
    </>
  );
}
