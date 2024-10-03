import React, { useEffect, useState } from 'react'
import ProductGallery from './ProductGallery'
import axios from 'axios';
import baseUrl from '../configuration/apiconfig';
import classes from "../styles/BodySpray.module.css"

export default function BodySprays() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [bodySprays, setBodySprays] = useState(null);



useEffect(()=> {
  const fetchBodySprays = async () => {
    try{
      const response = await axios.get(`${baseUrl}/api/products/category/${4}`);
      if(response.status === 200){
        setBodySprays(response.data);
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
  fetchBodySprays();
},[])


let stateMessage;
if (loading) {
  stateMessage = "Loading...";
} else if (err) {
  stateMessage = "Something went wrong, please try again later.";
} else if (bodySprays.length === 0) {
  stateMessage = "No products available.";
}

if (loading || err || bodySprays.length === 0) {
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
      <ProductGallery heading="Body Spray Section" mainSection={true}  products={bodySprays} />
      </div>
    </>
  )
}
