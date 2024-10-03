import React from "react";
import classes from "../styles/OrderedProduct.module.css";
export default function OrderedProduct({ product }) {
  return (
    <>
      <div className={classes.grid3}>
        <div className={classes.imgDiv}>
          <img
            className={classes.img}
            src={product.imageUrl}
            alt="product-image"
          ></img>
        </div>
        <div className={classes.description}>
          <p>{product.description}</p>
        </div>
        <div className={classes.priceDetails}>
          {product.discountType !== null ? (
            <>
              <span className={classes.discountedPrice}>
                ₹{product.discountedPrice}
              </span>
              <span className={classes.basePrice}>₹{product.price}</span>
              <div className={classes.discountInfo}>
                {product.discountType === "Percentage"
                  ? `${product.discountValue}% OFF`
                  : `FLAT ₹${product.discountValue} OFF`}
              </div>
            </>
          ) : (
            <span>₹{product.price}</span>
          )}
        </div>
      </div>
    </>
  );
}
