import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductGallery from './ProductGallery.jsx';
import classes from "../styles/Watches.module.css"
import Featured from './Featured.jsx';

function FeaturedProductList() {

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/products/active-featured`);
        if (response.status === 200) {
          setProducts(response.data);
          setLoading(false);
        } else {
          setErr(true);
          setLoading(false);
        }
      } catch (error) {
        setErr(true);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  let stateMessage;
  if (loading) {
    stateMessage = "Loading...";
  } else if (err) {
    stateMessage = "Something went wrong, please try again later.";
  } else if (products.length === 0) {
    stateMessage = "No products available.";
  }
  
  if (loading || err || products.length === 0) {
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
          <ProductGallery heading="Featured Section" mainSection={true} products={products} />
          {/* <Category /> */}
        </div>
    </>
  );
}

export default FeaturedProductList;
