import React, { useEffect, useState } from 'react'
import ProductGallery from './ProductGallery'
import axios from 'axios';
import baseUrl from '../configuration/apiconfig';
import classes from "../styles/Goggles.module.css"

export default function Goggles() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [goggles, setGoggles] = useState(null);



useEffect(()=> {
  const fetchGoggles = async () => {
    try{
      const response = await axios.get(`${baseUrl}/api/products/category/${2}`);
      if(response.status === 200){
        setGoggles(response.data);
        setLoading(false);
        setErr(false);
      }else{
        setErr(true);
        setLoading(false);
      }
    }catch(error){
      console.error(error);
      setErr(true);
      setLoading(false);
    }
  }
  fetchGoggles();
},[])


let stateMessage;
if (loading) {
  stateMessage = "Loading...";
} else if (err) {
  stateMessage = "Something went wrong, please try again later.";
} else if (goggles.length === 0) {
  stateMessage = "No products available.";
}

if (loading || err || goggles.length === 0) {
  return (
    <div className="container mt-5">
      <div className="alert alert-info" role="alert">
        {stateMessage}
      </div>
    </div>
  );
}
  

  return (
    <>
    <div className={classes.categorySectionContainer}>
    <ProductGallery heading="Goggles Section" mainSection={true}  products={goggles} />
    </div>
    </>
  )
}
