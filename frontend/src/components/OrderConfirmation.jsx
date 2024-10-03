import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

export default function OrderConfirmation({ open, handleClose, orderDetails, handleConfirm }) {

    const handleOrder = () => {
          handleConfirm();
        };
    let totalPrice = 0  ;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", color: "#2874f0" }}>
        Confirm Your Order
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please review your order before confirming.
        </DialogContentText>

        {/* Order Items */}
        <div style={{ marginTop: "1.5rem" }}>
          <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Order Summary</h4>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {orderDetails.product.map((item) => (
              <li key={item.product.productId} style={{ marginBottom: "0.8rem" }}>
                <span>{item.product.productName} </span>
                <span style={{ fontWeight: "600", marginRight: "5px" }}>x {item.quantity}</span>
                <span style={{ float: "right" }}>${item.product.discountedPrice}</span>
              {totalPrice = totalPrice + item.product.discountedPrice}
              </li>
            ))}
          </ul>
          <p style={{ fontWeight: "bold", marginTop: "1rem", fontSize: "1.2rem" }}>
            Total Price: ${totalPrice} + shipping
          </p>
        </div>

        {/* Shipping Address */}
        <div style={{ marginTop: "1.5rem" }}>
          <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Shipping Address</h4>
          <p>{orderDetails.address.fullAddress}</p>
          <p>{orderDetails.address.city}, {orderDetails.address.state}, {orderDetails.address.pinCode}</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ color: "#fb641b", textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleOrder}
          variant="contained"
          sx={{
            backgroundColor: "#fb641b",
            "&:hover": { backgroundColor: "#e95515" },
            textTransform: "none",
          }}
        >
          Confirm Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}
