import Product from "./Product.jsx";
import classes from "../styles/ProductGallery.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img from "../imgs/icons8-tick-box-52.png"

function ProductGallery({ heading, products}) {
  return (
    <>
      <div className={classes.sectionContainer}>
        <div className={classes.headline}>
        <div className={classes.headerTitle}>{heading}</div>  
        </div>
        <div className={classes.productGrid}>
          {products.map(product => (
              <div className={classes.productCart} key={product.productId}>
              <Product displayProduct={product} />
            </div>
          ))}                      
        </div>
      </div>
    </>
  );
}

export default ProductGallery;
