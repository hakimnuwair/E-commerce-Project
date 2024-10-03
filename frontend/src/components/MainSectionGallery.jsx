import Product from "./Product.jsx";
import classes from "../styles/MainSectionGallery.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img from "../imgs/icons8-tick-box-52.png";

function MainSectionGallery({ heading, products, redirectTo }) {
  return (
    <>
      <div className={classes.sectionContainer}>
        <div className={classes.headline}>
          <div className={classes.headerTitle}>{heading}</div>
          {redirectTo !== null ? (
           <Link to={`/${redirectTo}`}>
           <span className={classes.desc} style={{ marginRight: "8px" }}>Explore more</span>
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
         </Link>         
          ) : null}
        </div>
        <div className={classes.mainProductGallery}>
          {products.map((product) => (
            <div className={classes.gridItem} key={product.productId}>
              <Product displayProduct={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MainSectionGallery;
