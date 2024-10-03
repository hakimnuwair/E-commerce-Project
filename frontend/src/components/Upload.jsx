import React, { useState } from "react";
import axios from "axios";
import "../styles/Upload.css";
import getAuthenticationToken from "../util/getAuthenticationToken";
import { useRouteLoaderData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Upload = () => {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const [categoryId, setCategoryId] = useState(0); // Adjust default value as needed
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0); // Adjust default value as needed
  const [stockQuantity, setStockQuantity] = useState(0); // Adjust default value as needed
  const [featured, setFeatured] = useState(false); // New field for featured status
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const authData = useRouteLoaderData("admin");
  const [status, setStatus] = useState('');


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (authData.token === null) {
      return;
    } else {
      if (
        !file ||
        !productName ||
        !urlSlug ||
        categoryId <= 0 ||
        !description ||
        price <= 0 ||
        stockQuantity <= 0
      ) {
        setMessage("Please fill in all fields with valid data.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("productName", productName);
      formData.append("urlSlug", urlSlug);
      formData.append("categoryId", categoryId);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stockQuantity", stockQuantity);
      formData.append("featured", 1);
      formData.append("status", status);

      console.log("status ",status)
      setLoading(true);

      try {
        console.log("featured: ", featured);
        const response = await axios.post(
          "http://localhost:8080/api/products/uploads",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + authData.token,
            },
          }
        );
        console.log("Upload successful:", response.data);
        toast.success("Product uploaded successfully")
        // Reset form
        // setProductName("");
        // setUrlSlug("");
        // setCategoryId(0);
        // setDescription("");
        // setPrice(0.0);
        // setStockQuantity(0);
        // setFeatured(false);
      } catch (error) {
        console.error("Error uploading the file", error);
        toast.error("Error uploading product");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="upload-section">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file" className="label">
            Product Image
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productName" className="label">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="urlSlug" className="label">
            URL Slug
          </label>
          <input
            type="text"
            id="urlSlug"
            placeholder="URL Slug"
            value={urlSlug}
            onChange={(e) => setUrlSlug(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId" className="label">
            Category ID
          </label>
          <input
            type="number"
            id="categoryId"
            placeholder="Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="label">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stockQuantity" className="label">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            placeholder="Stock Quantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(parseInt(e.target.value))}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="featured" className="label">
            Featured
          </label>
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="checkbox"
          />
        </div>
        <div className="form-group">
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option disabled value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <div className="alert">{message}</div>}
    </div>
    </>
  );
};

export default Upload;
