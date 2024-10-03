import React from "react";
import "../styles/CartItem.css";
import img from "../imgs/rick-muigo-SX9IouL_qOg-unsplash.jpg";
import axios from "axios";
import getAuthenticationToken from "../util/getAuthenticationToken";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function CartItem({
  item,
  handleIncrease,
  handleDecrease,
  handleRemove,
}) {
  let discount = 0;
  if (item.product.DiscountType === "null") {
    discount = 0;
  } else if (item.product.DiscountType === "Percentage") {
    discount = item.product.price * (item.product.discountPercentage / 100);
  } else {
    discount = item.product.discountValue;
  }

  const handleQtyIncrease = () =>{
    if(item.quantity < item.product.stockQuantity){
      handleIncrease(item.product.productId);
    }else{
      toast.error("Not enough quantity available",{
        position: "top-center"
      })
    }
  }
  return (
    <>
      <div className="cart-item-section">
      <ToastContainer/>
        <div className="cart-item-container">
          <div className="cart-item-content-grid2">
            <div className="item-img">
              <Link to={`/view-product/${item.product.productId}`}>
              <img
                src={item.product.imageUrl}
                height="112px"
                width="112px"
                alt="cart-product-image"
              />
              </Link>
            </div>
            <div className="item-details">
              <div className="product-name">
                Name: {item.product.productName}
              </div>
              <div className="description">
                Description: {item.product.description}
              </div>
              <div>Price: {item.product.price}</div>
              {item.product.discountType !== null ? (
                item.product.discountValue === 0 ? (
                  <>
                    <div>Discount: {item.product.discountPercentage}%</div>
                    <div>Discounted Price: {item.product.discountedPrice}</div>
                  </>
                ) : item.product.discountPercentage === 0 ? (
                  <>
                    <div>Discount: FLAT {item.product.discountValue} Rs</div>
                    <div>Discounted Price: {item.product.discountedPrice}</div>
                  </>
                ) : null
              ) : null}
            </div>
            {/* <div className="delivery-status"></div> */}
            <div className="quantity-btns">
              {item.quantity === 1 ? (
                <button className="decrease-qty" disabled>
                  -
                </button>
              ) : (
                <button
                  className="decrease-qty"
                  onClick={() => handleDecrease(item.product.productId)}
                >
                  -
                </button>
              )}

              <div className="qty">{item.quantity}</div>
              <button
                className="increase-qty"
                onClick={handleQtyIncrease}
              >
                +
              </button>
            </div>
            <div className="remove-btn">
              <button
                onClick={() => handleRemove(item.product.productId)}
                className="btn btn-primary"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
