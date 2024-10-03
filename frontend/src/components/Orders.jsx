import React, { useEffect, useState } from "react";
import classes from "../styles/Orders.module.css";
import axios from "axios";
import { Link, useRouteLoaderData } from "react-router-dom";
import Order from "./Order";
import OrderedProduct from "./OrderedProduct";
import OrderStatus from "./OrderStatus";
import "../styles/OrderProgress.css"

export default function Orders({order}) {
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' }; // Format: 09 Sep 2024
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); // 'en-GB' ensures day/month format
  };

  const formattedDate = formatDate(order.createdAt);

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div className={classes.orderDetails}>
          <span>Purchased Online- {formattedDate}</span>
          <span>Order No: {order.orderNumber}</span>
        </div>
        <OrderStatus orderStatusHistoryList={order.orderStatusHistoryList}/>

        <div className={classes.products}>
          {order.orderItemDTOList.map((product) => 
          (<OrderedProduct product={product} />))
          }
        </div>
        <div className={classes.deliveryAddress}>
          <div className={classes.heading}>Delivery</div>
          <div className={classes.address}>
          <span>{order.shippingAddressDTO.fullAddress}</span>
          <span>{order.shippingAddressDTO.city}</span>
          <span>{order.shippingAddressDTO.pinCode}, 
           {order.shippingAddressDTO.state}</span>
          <span>{order.shippingAddressDTO.mobileNo}</span>
          </div>
        </div>
        <div className={classes.payment}>
          <div className={classes.heading}>Payment</div>
          <div className={classes.paymentDetails}>
            <span>₹{order.netAmount}</span>
            <span>{order.paymentType}</span>
          </div>
        </div>
        <div className={classes.summaryPayment}>
          <div className={classes.totalAmount}>Total Amount</div>
          <div className={classes.amount}>₹{order.totalAmount}</div>
          {order.discountedAmount != 0 ? 
          (<><div className={classes.discountedAmount}>Discounted Amount</div>
            <div className={classes.amount}>₹{order.discountedAmount}</div>
            <div className={classes.grossAmount}>Gross Amount</div>
            <div className={classes.amount}>₹{order.grossAmount}</div>
            </>
          )
          : null
        }
        <div className={classes.shippingAmount}>Shipping Amount</div>
        <div className={classes.amount}>₹{order.shippingAmount}</div>
        <div className={classes.netAmount}>Net Amount</div>
        <div className={classes.amountNet}>₹{order.netAmount}</div>
        </div>
        <div className={classes.help}>
          <span className={classes.helpTitle}>Need Help?</span>
          <div className={classes.helpOptions}>
            <span>Cancelling Order</span>
            <span>Returns Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
