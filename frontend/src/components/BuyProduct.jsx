import React, { useContext } from "react";
import "../styles/BuyProduct.css";
import { toast, ToastContainer } from "react-toastify";

export default function BuyProduct({
  product,
  handleIncrease,
  handleDecrease,
  handleRemove,
}) {

  let discount = 0;
  if (product.product.DiscountType === "null") {
    discount = 0;
  } else if (product.product.DiscountType === "Percentage") {
    discount =
      product.product.price * (product.product.discountPercentage / 100);
  } else {
    discount = product.product.discountValue;
  }

  const handleQtyIncrease = () =>{
    if(product.quantity < product.product.stockQuantity){
      handleIncrease(product.product.productId)
    }else{
      toast.error("Not enough quantity available",{
        position: "top-center"
      })
    }
  }

  return (
    <>
      <div className="buy-product-section">
        <div className="buy-product-container-grid3">
          <div className="product-img">
            <img
              src={product.product.imageUrl}
              height="112px"
              width="112px"
              alt="product image"
            />
          </div>
          <div className="buy-product-details">
            <div className="productName">{product.product.productName}</div>
            <div className="productDescription">
              {product.product.description}
            </div>
            <div className="productprice">{product.product.price}</div>
            {product.product.discountType !== null ? (
              product.product.discountValue === 0 ? (
                <>
                  <p>Discount: {product.product.discountPercentage}%</p>
                  <p>Discounted Price: {product.product.discountedPrice}</p>
                </>
              ) : product.product.discountPercentage === 0 ? (
                <>
                  <p>Discount: FLAT {product.product.discountValue} Rs</p>
                  <p>Discounted Price: {product.product.discountedPrice}</p>
                </>
              ) : null
            ) : null}
          </div>
          {/* <div className="delivery-status">delivery status</div> */}

          <div className="buy-product-actions">
            {product.quantity === 1 ? (
              <button disabled>-</button>
            ) : (
              <button onClick={() => handleDecrease(product.product.productId)}>
                -
              </button>
            )}

            <button>{product.quantity}</button>
            <button onClick={handleQtyIncrease}>
              +
            </button>
          </div>
          <div className="remove-btn">
            <button
              className="remove btn btn-primary"
              onClick={() => handleRemove(product.product.productId)}
            >
              remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
