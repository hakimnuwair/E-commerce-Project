import React, { useContext, useEffect, useState } from "react";
import "../styles/Cart.css";
import CartItem from "./CartItem";
import PriceDetails from "./PriceDetails";
import getAuthenticationToken from "../util/getAuthenticationToken";
import { Form, json, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import CartLoader from "./CartLoader";
import { loader as cartLoader } from "./CartLoader";
import EmptyCartMessage from "./EmptyCartMessage";
import OrderProduct from "./OrderProduct";
import { CartCtx } from "../shop/CartCtx";
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const authData = useRouteLoaderData("root");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const negative = 100;
  const navigate = useNavigate();

  const cartCtx = useContext(CartCtx);


  const handleOrder = async () => {
    if(authData.token === null){
      navigate("/account");
    }else{
      localStorage.setItem('products', JSON.stringify(cartCtx.items));
      sessionStorage.clear("address");
      navigate(`/order`)
    }
  }


  if(cartCtx.fetchCartError !== null){
    return(
      <p className="alert alert-info" style={{width: "50%", margin: "20px auto"}}>Error loading cart data, Please try again later</p>
    )
  }


  if(cartCtx.items && cartCtx.items.length === 0){
    return <EmptyCartMessage />;
  }

  return (
    <>
      <div className="cart-section">
        <div className="cart-container">
          <div className="cart-content-container">
            <div className="cart-main-flex-container">
              <div className="cart-first-column">
                <div className="user-cart">
                      {cartCtx.items.map((cartItem) => (
                        <CartItem
                          key={cartItem.productId}
                          item={cartItem}
                          handleIncrease={cartCtx.handleIncrease}
                          handleDecrease={cartCtx.handleDecrease}
                          handleRemove={cartCtx.handleRemove}
                        />
                      ))}
                      <div className="place-order-container">
                        <div className="border-helper"></div>
                        <div className="place-order">
                          <button className="btn btn-primary order-btn" onClick={handleOrder}>
                            PLACE ORDER
                          </button>
                    
                        </div>
                      </div>
                </div>
              </div>
                <div className="cart-second-column">
                  <PriceDetails products={cartCtx.items} cart={true} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export function loader(){
//     const authData = getAuthenticationToken();
//     try{
//         const response = axios.get("http//localhost:8080/cart",
//             {
//                 headers : {
//                     Authorization : 'Bearer ' +  authData.token
//                 }
//             });
//             if(response.status === 200){
//                 return response.data;
//             }else{
//                 throw "NOT FOUND";
//             }
//     }catch(error){
//         throw error;
//     }
// }
