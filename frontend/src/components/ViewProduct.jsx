import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import img from "../imgs/rick-muigo-SX9IouL_qOg-unsplash.jpg";
import Reviews from "./Reviews";
import RelatedProducts from "./RelatedProducts.jsx";
import "../styles/ViewProduct.css";
import { CartCtx } from "../shop/CartCtx.jsx";
import LoginMessage from "./LoginMessage.jsx";
import ProductVariations from "./ProductVariations.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../styles/ViewProduct.module.css"

export default function ViewProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const authData = useRouteLoaderData('root');
  const cartCtx = useContext(CartCtx);
  const [loginMessage, setLoginMessage] = useState(false);
  const [productVariants, setProductVariants] = useState(null);
  const [variantLoading, setVariantLoading] = useState(true);
  const [variantError, setVariantError] = useState(false);
  const navigate = useNavigate();
  const [variantChange, setVariantChange] = useState(null);


  useEffect(() => {
    if (cartCtx.addCartError !== null) {
      toast.error("This product is already in your cart",{
        position: "top-center"
      })
        // const timer = setTimeout(() => {
        //     cartCtx.handleAddCartError(null); // Assuming you have a method to set the error to null
        // }, 5000);

        // // Clear the timeout if the component unmounts or if addCartError changes
        // return () => clearTimeout(timer);
        cartCtx.handleAddCartError(null);
    }
    
    if(cartCtx.addCartErr !== null){
      toast.error(cartCtx.addCartErr, {
        position : "top-center"
      });
      cartCtx.handleAddCartErr(null);
    }

    if(cartCtx.addCartNotify !== null){
      cartCtx.handleAddCartNotify(null);
      toast.success("Item added successfully" , {
        position : "top-center"
      });
    }
}, [cartCtx.addCartError, cartCtx.addCartErr, cartCtx.addCartNotify]);
  
  useEffect(() => {

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        if (response.status === 200) {
          setProduct(response.data);
          setLoading(false);
          setError(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(true);
        setLoading(false);
      }
    };

    const fetchVariants = async () =>{
      setVariantLoading(true);
      try{
          const response =  await axios.get(`http://localhost:8080/api/product_variants/${productId}`);
          if(response.status === 200){
            setVariantLoading(false);
            setVariantError(false);
            setProductVariants(response.data);
          }else{
            setVariantLoading(false);
            setVariantError(true);
          }
      }catch(error){
        setVariantLoading(false);
        setVariantError(true);
        console.error(error);
        toast.error("Error occured, Please try again later", {
          position: "top-center",
        })
      }
    }

    if (productId) {
      fetchProduct();
      fetchVariants();
    }
  }, [productId]);



  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data.</p>;
  }

  const handleVariantChange = () => {
    setVariantChange(null);
  }

  

  const handleOrder = async (id) =>{
      const response = await axios.get(`http://localhost:8080/api/products/${id}`,{
      });
  
      if(response.status === 200){
        localStorage.setItem('products', JSON.stringify([{ product : {...response.data}, quantity: 1 }]));
        sessionStorage.clear("address");
      }
      navigate(`/order`);
  }

  if(loginMessage === true){
    return <LoginMessage />
  }

  return (
    <>
    <ToastContainer />
      <div className={classes.viewSectionContainer}>
        <div className="view-product-container">
          <div className="view-product-main-row">
            <div className="img-column-container">
              <img src={product.imageUrl} className="view-img" alt="product-image" />
              <div className="action-buttons-row">
                <div style={{display : "flex", flexDirection: "column", gap: "5px"}}>
                <button className="action-btn btn btn-primary" onClick={()=>cartCtx.handleAdd(product.productId)}>ADD TO CART</button>
                </div>
                <div className="action-btn btn btn-primary" onClick={()=>handleOrder(product.productId)}>BUY NOW</div>
              </div>
            </div>
            <div className="img-details-container">
              <p className="product-name">{product.productName}</p>
              <p className="product-description">{product.description}</p>
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
            <span className={classes.simplePrice}>₹{product.price}</span>
          )}
        </div>
              {variantLoading === true ? (<p>loading...</p>) : (variantError ? <p>Error loading variants</p> : ((productVariants === null || productVariants.length === 0) ? null : (<ProductVariations productVariants = {productVariants}/>)) ) }
              <Reviews />
            </div>
          </div>
        </div>
      </div>
      
      {product && product.categoryId && (
        <div className={classes.viewSectionContainer}>
          <RelatedProducts categoryId={product.categoryId} />
        </div>
      )}
    </>
  );
}
