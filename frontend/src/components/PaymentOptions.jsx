import React, { useState } from "react";
import "../styles/PaymentOptions.css";
import OrderConfirmation from "./OrderConfirmation";

export default function PaymentOptions({ handleOrderConfirm, product, address }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [open, setOpen] = useState(false);


  const [orderDetails, setOrderDetails] = useState({
    product,
    address, 
  });

  console.log("order details made in for confirmation: ", orderDetails)

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleConfirm = () => {
    handleOrderConfirm(paymentMethod);
    setOpen(false);
  }

  const handleOrder = () => {
    if(paymentMethod === null){
      setAlertMessage("Select a payment option")
    }else{
      setOpen(true);
    }
  }

  return (
    <>
      <div className="payment-options-container">
        <div className="upi-options">
          <input
            type="radio"
            name="payment-option"
            value="upi"
            onChange={handleChange}
          />
          <div className="option-name">UPI</div>
        </div>
        <div className="upi-options" style={{ borderBottom: "none" }}>
          <input
            type="radio"
            name="payment-option"
            value="cod"
            onChange={handleChange}
          />
          <div className="option-name">Cash on Delivery</div>
        </div>
        {alertMessage && (
          <div className="upi-options alert-msg" style={{ color: "red" }}>
            {alertMessage}
          </div>
        )}
        <div className="text-end" style={{ padding: "1.2rem 2.4rem" }}>
          <button
            className="payment-btn btn"
            onClick={handleOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>
      <OrderConfirmation open={open} handleClose={handleClose} orderDetails={orderDetails} handleConfirm={handleConfirm} paymentMethod={paymentMethod}/>
    </>
  );
}
