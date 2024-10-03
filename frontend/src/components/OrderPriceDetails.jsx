import React from "react";
import PropTypes from 'prop-types';
import classes from "../styles/OrderPriceDetails.module.css"
export default function OrderPriceDetails({ products  }) {
    let price = 0;
    let quantity = 0;
    let shipping = 100;
    let discount = 0;

    const calucalteDiscount = (price,discountType,discountValue,discountPercentage) => {
      if(discountType === null){
        return 0;
      }else if(discountType === 'Percentage'){
        return (price * (discountPercentage/100));
      }else{
        return discountValue;
      }
    }

    products.forEach((item) => {
      price += item.product.price * item.quantity;
      quantity += item.quantity;
      discount = discount + (item.quantity * calucalteDiscount(item.product.price,item.product.discountType,item.product.discountValue,item.product.discountPercentage));
    });
    price = price + 100;


  return (
    <div className={classes.priceDetailsSection}>
      <div className={classes.priceDetailsTitle}>PRICE DETAILS</div>
      <div className={classes.borderHelper}></div>
      <div className={classes.calculations}>
        <div className={classes.calculationsDetails}>
          <div className="price-qty">Price ({quantity} items)</div>
          <div className="total-price">₹{price.toFixed(2)}</div>
        </div>
        <div className="calculations-details">
          <div className="discount">Discount</div>
          <div className="delivery-charges">₹{discount.toFixed(2)}</div>
        </div>
        <div className="calculations-details">
          <div className="discount">Delivery Charges</div>
          <div className="delivery-charges">₹{shipping.toFixed(2)}</div>
        </div>
        <div className="border-helper"></div>
        <div className="calculations-details">
          <div className="discount">Total Amount</div>
          <div className="delivery-charges">₹{(price - discount).toFixed(2)}</div>
        </div>
        <div className="border-helper"></div>
        <div className={classes.savingMsg}>
          {discount !== 0 ? (`You will save ₹${discount.toFixed(2)} on this order`) : null}
        </div>
      </div>
    </div>
  );
}


