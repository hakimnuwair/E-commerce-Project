import React, { useState } from 'react';
import axios from 'axios';
import { useRouteLoaderData } from 'react-router-dom';

const AddProductVariantForm = () => {
  const authData = useRouteLoaderData('root');
  const [file, setFile] = useState(null);
  const [productVariant, setProductVariant] = useState({
    productId: '',
    color: '',
    size: '',
    price: '',
    stockQuantity: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductVariant({ ...productVariant, [name]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      console.error('Please select a file to upload.');
      return;
    }
  
    if (!authData.token) {
      return;
    } else {
      
  
      const formData = new FormData();
      formData.append('file', file);

      // Append each field from productVariant separately
      formData.append('productId', productVariant.productId);
      formData.append('color', productVariant.color);
      formData.append('size', productVariant.size);
      formData.append('price', productVariant.price);
      formData.append('stockQuantity', productVariant.stockQuantity);  
      try {
        const response = await axios.post('http://localhost:8080/api/product_variants/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${authData.token}`
          },
        });
        console.log('Product variant added successfully:', response.data);
      } catch (error) {
        console.error('Error adding product variant:', error);
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="file" className="label">Product Image</label>
        <input type="file" id="file" onChange={handleFileChange} className="input" />
      </div>
      <div>
        <label htmlFor="productId">Product ID:</label>
        <input
          type="number"
          id="productId"
          name="productId"
          value={productVariant.productId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={productVariant.color}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="size">Size:</label>
        <input
          type="text"
          id="size"
          name="size"
          value={productVariant.size}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Price">Price:</label>
        <input
          type="number"
          step="0.01"
          id="Price"
          name="price"
          value={productVariant.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="stockQuantity">Stock Quantity:</label>
        <input
          type="number"
          id="stockQuantity"
          name="stockQuantity"
          value={productVariant.stockQuantity}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Product Variant</button>
    </form>
  );
};

export default AddProductVariantForm;
