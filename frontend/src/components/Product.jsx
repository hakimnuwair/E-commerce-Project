import { Link, useNavigate } from "react-router-dom";
import img from "../imgs/rick-muigo-SX9IouL_qOg-unsplash.jpg";
import classes from "../styles/Product.module.css";

export default function Product({ displayProduct }) {
  const navigate = useNavigate();

  // if (!displayProduct) {
  //   return <p>Loading...</p>; // You can customize this message or add a loading spinner if desired
  // }

  const handleProductClick = (id) =>{
    navigate(`/view-product/${displayProduct.productId}`);
  }


  return (
    <div className={classes.productSection}>
      <div className={classes.productContainer} onClick={handleProductClick}>
        <div className={classes.imgContainer}>
          <span>
            <img
              className={classes.responsiveImg}
              src={displayProduct.imageUrl}
              alt="Product image"
              height="250px"
              width="100%"
            />
            </span>
        </div>
        <div className={classes.paddingHelper}>
        <div className={classes.productName}>{displayProduct.productName}</div>
        <div className={classes.ellipsis}>{displayProduct.description}</div>
        <div className={classes.priceContainer}>
          {displayProduct.discountType !== null ? (
            <>
              <span className={classes.discountedPrice}>
                ₹{displayProduct.discountedPrice}
              </span>
              <span className={classes.basePrice}>₹{displayProduct.price}</span>
              <div className={classes.discountInfo}>
                {displayProduct.discountValue === 0
                  ? `${displayProduct.discountPercentage}% OFF`
                  : `FLAT ₹${displayProduct.discountValue} OFF`}
              </div>
            </>
          ) : (
            <span>₹{displayProduct.price}</span>
          )}
        </div>
        <div>
        </div>
        </div>
      </div>
    </div>
  );
}
