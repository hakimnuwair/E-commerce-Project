import React, { useEffect, useState } from 'react'
import ProductGallery from './ProductGallery'
import axios from 'axios';

export default function RelatedProducts ({categoryId}) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState(null);


  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/products/category/${categoryId}`);
        if (response.status === 200) {
          setCategoryProducts(response.data);
          setLoading(false);
          setErr(false);
        } else {
          setLoading(false);
          setErr(false);
        }
      } catch (error) {
        setLoading(false);
        setErr(true);
        console.error("Error fetching related products:", error);
      }
    };
    if(categoryId){
      fetchRelatedProducts();
    }

  }, [categoryId])

  if (loading) {
    return <p>Loading...</p>;
  }

  if (err) {
    return <p>Error loading data.</p>;
  }
  
  return (
    <ProductGallery heading="Related Products" products={categoryProducts} />
  )
}
