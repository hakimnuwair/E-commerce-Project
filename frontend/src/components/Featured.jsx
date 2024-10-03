import React,{useState, useEffect} from 'react'
import axios from 'axios'
import ProductGallery from './ProductGallery'
import MainSectionGallery from './MainSectionGallery'
import classes from "../styles/MainSectionFeatured.module.css"
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


export default function Featured() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/products/active-featured-selected`,{
        });
        console.log("app featured response: ", response);
        if (response.status === 200) {
          setProduct(response.data);
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
} else if (product.length === 0) {
  stateMessage = "No products available.";
}

 

if (loading || err || product.length === 0) {
  return (
    <>
    <div className="container">
      <div className="alert alert-info" role="alert">
        {stateMessage}
      </div>
    </div>
    </>
    
  );
}
    
  return (
    <>
    {loading 
      ? (<span>Loading...</span>)
      : err 
      ? (<span>{err}</span>) :
    <div className={classes.mainSectionContainer}>
          <MainSectionGallery heading="Featured Products" redirectTo="featured" products={product} />
    </div>
    }
  </>)
}
