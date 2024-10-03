import React, { useEffect, useState } from 'react'
import ProductGallery from './ProductGallery'
import axios from 'axios';
import baseUrl from '../configuration/apiconfig';
import classes from "../styles/Perfumes.module.css"

export default function Perfumes() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [perfumes, setPerfumes] = useState(null);



useEffect(()=> {
  const fetchPerfumes = async () => {
    try{
      const response = await axios.get(`${baseUrl}/api/products/category/${3}`);
      if(response.status === 200){
        setPerfumes(response.data);
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
  fetchPerfumes();
},[])


let stateMessage;
if (loading) {
  stateMessage = "Loading...";
} else if (err) {
  stateMessage = "Something went wrong, please try again later.";
} else if (perfumes.length === 0) {
  stateMessage = "No products available.";
}

if (loading || err || perfumes.length === 0) {
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
    <ProductGallery heading="Perfumes Section" mainSection={true}  products={perfumes} />
    </div>
    </>
  )
}
