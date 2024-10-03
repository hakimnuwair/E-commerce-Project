import React from 'react'
import "../styles/PriceDetails.css"

export default function ProductPriceDetails({product}) {
    console.log("product in details : ", product)
    let quantity = 1;
    let discount = 0;
  return (
    <>
        <div className="price-details-section">
      <div className="price-detail-title">PRICE DETAILS</div>
      <div className="border-helper"></div>
      <div className="calculations">
        <div className="calculations-details">
          <div className="price-qty">Price ({quantity} items)</div>
          <div className="total-price">₹{product.price.toFixed(2)}</div>
        </div>
        <div className="calculations-details">
          <div className="discount">Discount</div>
          <div className="delivery-charges">₹{discount.toFixed(2)}</div>
        </div>
        <div className="calculations-details">
          <div className="discount">Delivery Charges</div>
          <div className="delivery-charges">Free</div>
        </div>
        <div className="border-helper"></div>
        <div className="calculations-details">
          <div className="discount">Total Amount</div>
          <div className="delivery-charges">₹{(product.price - discount).toFixed(2)}</div>
        </div>
        <div className="border-helper"></div>
        <div className="saving-msg">
          You will save ₹{discount.toFixed(2)} on this order
        </div>
      </div>
    </div>
    </>
  )
}
