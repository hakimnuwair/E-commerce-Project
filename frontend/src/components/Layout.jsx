import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useRouteLoaderData } from "react-router-dom";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import { CartCtx } from "../shop/CartCtx.jsx";
import axios from "axios";
import classes from "../styles/Layout.module.css";

export default function Layout() {
  const [cartCtxError, setCartCtxError] = useState(false);
  const authData = useRouteLoaderData('root');
  const [cartItems, setCartItems] = useState([]);
  const [changeTracker, setChangeTracker] = useState('');
  const [addCartError, setAddCartError] = useState(null);
  const [addCartErr, setAddCartErr] = useState(null);
  const [addCartNotify, setAddCartNotify] = useState(null);
  const [fetchCartError, setFetchCartError] = useState(null);
 
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchCart = async () => {
      setFetchCartError(null);
      try{
        const response = await axios.get("http://localhost:8080/cart",{
          headers : {
            Authorization : "Bearer " + authData.token
          }
        })
        if(response.status === 200){
          setCartCtxError(false);
          setCartItems(response.data);
        }
      }catch(error){
        console.error(error);
        setFetchCartError(true);
      }
    }
    if(authData.token != null){
      fetchCart();
    }else{
      setCartItems([]);
    }
  },[authData.token, changeTracker]);



  const decreaseQty = async (id) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.productId === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
  };

  const increaseQty = async (id) => {
         setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.productId === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/cart/${id}`, {
        headers: {
          Authorization: "Bearer " + authData.token,
        },
      });
      if (response.status === 200) {
        // setCartItems((prevItems) => prevItems.filter((item) => item.productId !== id));
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product.productId !== id)
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const addToCart = async (id) => {
    if(authData.token === null){
      navigate("/account");
    }else{
      try{
        const response = await axios.post("http://localhost:8080/cart/add",{productId : id},
          {
              headers : {
                  Authorization : "Bearer " + authData.token
              }
          }
      )
        if(response.status === 200){
            setChangeTracker(Date.now());
            setAddCartError(null);
            setAddCartErr(null);
            setAddCartNotify(true);
        }
      }catch(error){
        if(error.response && error.response.status === 409){
            setChangeTracker(Date.now());  
            setAddCartError("Item Already Present in The Cart");
        }else{
          setAddCartErr("Error adding product");
        }
        console.error(error);
      }
    }
  }

  const handleOrderSuccessful = () =>{
    console.log("order succesful tracker");
    setChangeTracker(Date.now());
  }

  const handleAddCartError = (para) =>{
    setAddCartError(para);
  }

  const handleAddCartErr = (para) =>{
     setAddCartErr(para);
  }

  const handleAddCartNotify = (para) =>{
    setAddCartNotify(para);
  }
 

  const ctxValue = {
    items: cartItems,
    cartError : cartCtxError,
    addCartError : addCartError,
    addCartErr: addCartErr,
    addCartNotify : addCartNotify,
    fetchCartError : fetchCartError,
    handleAddCartError : handleAddCartError,
    handleAddCartErr : handleAddCartErr,
    handleAddCartNotify : handleAddCartNotify,
    handleIncrease: increaseQty,
    handleDecrease: decreaseQty,
    handleRemove : removeProduct,
    handleAdd : addToCart,
    handleOrderSuccessful : handleOrderSuccessful,
  };

  return (
    <>
      <CartCtx.Provider value={ctxValue}>
      <div className={classes.layoutSection}>
        <Nav />
        <Outlet />
        <Footer />
      </div>
      </CartCtx.Provider>
    </>
  );
}
