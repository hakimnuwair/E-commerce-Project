import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/OrderProgress.css"; // Optional: You can style the component with CSS.

const OrderStatus = ({orderStatusHistoryList}) => {
    const statuses = [{statusName : "Pending", updatedAt : "-"},{statusName: "Order Placed", updatedAt : "-"}, {statusName : "Processing", updatedAt : "-"},{statusName : "Shipped", updatedAt : "-"},{statusName : "Out for Delivery", updatedAt : "-" }, {statusName : "Delivered", updatedAt : "-"}];
    const currentIndex = orderStatusHistoryList[orderStatusHistoryList.length-1].deliveryStatusStep - 1;
    let width = ((currentIndex) / (statuses.length - 1 )* 100);
    let leftPercentage = ((1 / statuses.length) * 100)/2;
    orderStatusHistoryList.forEach((orderStatus, index) => {
      const formattedDate = new Date(orderStatus.updatedAt).toLocaleDateString('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      });
      statuses[index].updatedAt = formattedDate;
  });  return (
    <div>
      <div className="titleContainer">
        <div className="title">Order Status</div>
      </div>
      <div className="order-status-tracker">
        {statuses.map((status, index) => (
          <div key={index} className={`status-step ${index <= currentIndex ? "completed" : ""}`}>
            <div className="status-point"></div>
            <div className="status-label">{status.statusName}</div>
            <div className="status-label">{status.updatedAt}</div>
          </div>
        ))}
        <div className="progress-line" style={{left : `${leftPercentage}%`, right: `${leftPercentage}%`}}>
          <div
            className="progress-bar"
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
