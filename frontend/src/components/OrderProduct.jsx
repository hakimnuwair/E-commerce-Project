import React, { useContext, useEffect, useState } from "react";
import "../styles/OrderProduct.css";
import {useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import AddressSummary from "./AddressSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginProcess from "./LoginProcess";
import AddressProcess from "./AddressProcess";
import ProductProcess from "./ProductProcess";
import PaymentProcess from "./PaymentProcess";
import PriceProcess from "./PriceProcess";
import Enabled from "./Enabled";
import { CartCtx } from "../shop/CartCtx";

export default function OrderProduct() {
  const [userDetails, setUserDetails] = useState(null);
  const authData = useRouteLoaderData("root");
  const [product, setProduct] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [changeLogin, setChangeLogin] = useState("");
  const [address, setAddress] = useState(null);
  const [addressChange, setAddressChange] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const [processNo, setProcessNo] = useState(1);
  const [productsConfirm, setProductsConfirm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const cartCtx = useContext(CartCtx);
  
  const handleEditAddress = (address) => {
    setEditAddress(address);
  };

  const handleOrderSummary = (flag) => {
    setProductsConfirm(flag);
    if(flag === true){
      handleProcessNo(4);
    }
  };

  useEffect(() => {
    setProduct(JSON.parse(localStorage.getItem("products")));
    setProductLoading(false);
  }, []);

  useEffect(() => {
      if(authData.token !== null && address !== null){
        setProcessNo(3);
        setProductsConfirm(false);
      }else if(authData.token === null){
        setProcessNo(1);
      }else if(address === null){
        setProcessNo(2);
      }
  }, [authData.token, address])

  useEffect(()=>{
    const sessionStorageAddress = JSON.parse(sessionStorage.getItem("address"));
    setAddress(sessionStorageAddress);
    setAddressLoading(false);
  },[])
  
  // useEffect(() => {
  //   const fetchAddress = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/address", {
  //         headers: {
  //           Authorization: "Bearer " + authData.token,
  //         },
  //       });
  //       if (response.status === 200) {
  //         if (response.data) {
  //           setAddress(response.data);
  //           setAddressLoading(false);
  //         } else {
  //           setAddress(null);
  //           setAddressLoading(false);
  //         }
  //       }else if(response.status === 404){
  //         setAddress(null);
  //         setAddressLoading(false);
  //       }
  //     } catch (error) {
  //       setAddress(null);
  //       setAddressLoading(false);
  //     }
  //   };
  //   if (authData.token != null) {
  //     fetchAddress();
  //   } else {
  //     setAddressLoading(false);
  //   }
  // }, [authData.token, addressChange]);

  const handleDecrease = async (id) => {
    const updatedProducts = product.map((item) =>
      item.product.productId === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProduct(updatedProducts);
  };

  const handleIncrease = async (id) => {
    const updatedProducts = product.map((item) =>
      item.product.productId === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProduct(updatedProducts);
  };

  const handleRemove = async (id) => {
    const updatedProducts = product.filter(
      (item) => item.product.productId !== id
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProduct(updatedProducts);
  };

  const handleChangeLogin = (data) => {
    setChangeLogin(data);
  };

  const handleUserChange = (currentUsername) => {
    setUserDetails(currentUsername);
  };

  const handleSetAddress = (data) => {
    setAddress(data);
  };

  const handleProcessNo = (no) =>{
    setProcessNo(no);
  }


  const handleOrderConfirm = async (paymentMethod) => {
    if (authData.token != null) {
      if (product.length === 0) {
        toast.error("Add product to placeorder", {
          position: "top-center",
        });
      } else if(address === null){
        toast.error("Add address to place order", {
          position: "top-center"
        })
      }else {
        try {
          const response = await axios.post(
            "http://localhost:8080/order",
            {
              product,
              paymentMethod,
              shippingAddressDTO: address,
            },
            {
              headers: {
                Authorization: "Bearer " + authData.token,
              },
            }
          );
          if (response.status === 200) {
            console.log(response.data);
            cartCtx.handleOrderSuccessful();
            toast.success("Order Placed Succesfully", {
              position: "top-center",
            });
          }
        } catch (error) {
         console.error(error);
          toast.error("Error occured, Please try again later")
        }
      }
    } else {
      toast.error("Login to placeorder", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      
      <div className="order-product-section">
      <ToastContainer />
        <div className="order-product-container">
          <div className="order-section">
            <LoginProcess
              userDetails={userDetails}
              handleUserChange={handleUserChange}
              Login={Login}
              handleChangeLogin={handleChangeLogin}
              handleProcessNo={handleProcessNo}
              handleOrderSummary={handleOrderSummary}
            />

            {processNo === 1 ? (<Enabled srNo={2} heading={"delivery address"} />) :
            (<AddressProcess
              addressLoading={addressLoading}
              address={address}
              AddressSummary={AddressSummary}
              handleSetAddress={handleSetAddress}
              handleProcessNo={handleProcessNo}
              handleOrderSummary={handleOrderSummary}
              editAddress={editAddress}
              handleEditAddress={handleEditAddress}
            />)
             }

             {processNo === 1 || (processNo === 2 && editAddress !== null) || (processNo === 2 && address === null)  ? (<Enabled srNo={3} heading={"order summary"}  />) :
             (<ProductProcess
              productLoading={productLoading}
              product={product}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              handleRemove={handleRemove}
              handleProcessNo={handleProcessNo}
              productsConfirm={productsConfirm}
              handleOrderSummary={handleOrderSummary}
            />)
             }
            
            {processNo === 1 || processNo === 2 || processNo === 3 ? (<Enabled srNo={4} heading={"payment options"}  />) :
            (<PaymentProcess handleOrderConfirm={handleOrderConfirm} product={product} address={address} />)
            }
          </div>

          {processNo === 1 || (processNo === 2 && address === null) ? (null) : 
          (<PriceProcess productLoading={productLoading} product={product} />)
          }
        </div>
      </div>
    </>
  );
}
