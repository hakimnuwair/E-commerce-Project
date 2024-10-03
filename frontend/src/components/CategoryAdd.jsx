import React, { useState } from "react";
import axios from "axios";
import "../styles/Upload.css";
import getAuthenticationToken from "../util/getAuthenticationToken";
import { useRouteLoaderData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const CategoryAdd = ({handleCategoryAdded}) => {
  const [file, setFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const authData = useRouteLoaderData("admin");


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
        !categoryName
      ) {
        setMessage("Please fill in all fields with valid data.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("categoryName", categoryName);
      setLoading(true);

      try {
        const response = await axios.post(
          `${BASE_URL}/api/category/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + authData.token,
            },
          }
        );
        if(response && response.status === 200){
          toast.success("Category uploaded successfully")
          setCategoryName('');
          handleCategoryAdded(Date.now());
        }
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
    <div className="upload-section">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file" className="label">
            Category Image
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
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="input"
          />
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

export default CategoryAdd;
