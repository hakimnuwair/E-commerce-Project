import React, { useEffect, useState } from "react";
import "../styles/ShippingAddress.css";
import axios from "axios";
import { json, useRouteLoaderData } from "react-router-dom";
export default function ShippingAddress({
  handleSetAddress,
  handleEditAddress,
  editAddress,
  handleProcessNo,
  handleOrderSummary,
}) {
  const authData = useRouteLoaderData("root");
  const [id, setId] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [addAddressErr, setAddAddressErr] = useState(null);

  useEffect(() => {
    if (editAddress) {
      setId(editAddress.id || "");
      setFullAddress(editAddress.fullAddress || "");
      setCity(editAddress.city || "");
      setState(editAddress.state || "");
      setPincode(editAddress.pinCode || "");
      setMobileNo(editAddress.mobileNo || "");
    }
  }, [editAddress]);

  const handleAddressChange = (event) => {
    setAddAddressErr(null);
    setFullAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setAddAddressErr(null);
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setAddAddressErr(null);
    setState(event.target.value);
  };

  const handlePincodeChange = (event) => {
    setAddAddressErr(null);
    setPincode(event.target.value);
  };

  const handleMobileNoChange = (event) => {
    setAddAddressErr(null);
    setMobileNo(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressData = {
      id: id,
      fullAddress: fullAddress,
      state: state,
      city: city,
      pinCode: pincode,
      mobileNo: mobileNo,
    };
    if (editAddress) {
      handleEditAddress(null);
      sessionStorage.setItem("address", JSON.stringify(addressData));
      handleSetAddress(addressData);
    } else {
      sessionStorage.setItem("address", JSON.stringify(addressData));
      handleSetAddress(addressData);
    }
  };

  const handleExistingAddress = () => {
    handleEditAddress(null);
    handleProcessNo(3);
    handleOrderSummary(false);
  };

  return (
    <>
      <form
        className="shipping-address-container-grid2"
        onSubmit={handleSubmit}
      >
        <textarea
          className="full-address"
          name="fullAddress"
          value={fullAddress}
          id=""
          placeholder="Address"
          onChange={handleAddressChange}
          required
        ></textarea>
        <select
          name="state"
          value={state}
          onChange={handleStateChange}
          required
        >
          <option value="" disabled>
            Select a state
          </option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
          {/* <option value="IL">Illinois</option>
                <option value="TX">Texas</option>
                <option value="AZ">Arizona</option> */}
          {/* Add more states as needed */}
        </select>
        <select name="city" value={city} onChange={handleCityChange} required>
          <option value="" disabled>
            Select a city
          </option>
          <option value="Solapur">Solapur</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Gulbarga">Gulbarga</option>
          {/* <option value="Houston">Houston</option>
                <option value="Phoenix">Phoenix</option> */}
          {/* Add more cities as needed */}
        </select>
        <input
          type="text"
          name="pincode"
          value={pincode}
          placeholder="Pincode"
          onChange={handlePincodeChange}
          required
        ></input>
        <input
          type="text"
          name="mobileNo"
          value={mobileNo}
          placeholder="Mobile Number"
          onChange={handleMobileNoChange}
          required
        ></input>
        <button className="btn btn-primary deliver-btn">
          {loading ? "Saving.." : "Save and Deliver Here"}
        </button>
        {editAddress ? (
          <button className="btn btn-primary existing-btn" onClick={handleExistingAddress}>
            USE EXISTING ADDRESS
          </button>
        ) : (
          <div></div>
        )}
        {addAddressErr ? (
          <label style={{ color: "red" }}>{addAddressErr}</label>
        ) : null}
      </form>
    </>
  );
}

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     const addressData = {
//         id : id,
//         fullAddress: fullAddress,
//         state: state,
//         city: city,
//         pincode: pincode,
//         mobileNo: mobileNo
//     };
//     if(editAddress){
//         try{
//             setLoading(true);
//             const response = await axios.put("http://localhost:8080/address",
//                 addressData,
//                 {
//                     headers: {
//                         Authorization: "Bearer " + authData.token
//                     }
//                 }
//             );

//             if(response.status === 200){
//                 handleSetAddress(addressData);
//                 handleEditAddress(null);
//                 handleOrderSummary(false);
//                 setLoading(false);
//                 setAddAddressErr(null);
//             }else{
//                 setLoading(false);
//                 setAddAddressErr("Something went wrong");
//             }
//         }catch(error){
//             setLoading(false)
//             setAddAddressErr("Something went wrong, try again later");
//             console.error(error);
//         }

//     }else{
//         try{
//             setLoading(true);
//             const response = await axios.post("http://localhost:8080/address",
//                 addressData,
//                 {
//                     headers: {
//                         Authorization: "Bearer " + authData.token
//                     }
//                 }
//             );

//             if(response.status === 200){
//                 handleSetAddress(addressData);
//                 setLoading(false);
//                 setAddAddressErr(null);
//             }else{
//                 setLoading(false);
//                 setAddAddressErr("Something went wrong, try again later");
//             }
//         }catch(error){
//             console.error(error);
//             setLoading(false);
//             setAddAddressErr("Something went wrong, try again later");
//         }

//     }

// }
